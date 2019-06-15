pragma solidity 0.5.4;

import "./ERC721Full.sol";


contract PatronageCollectibles is ERC721Full {
  event Minted(uint indexed tokenId, address from);
  event Deposited(uint indexed tokenId, uint value, address from);
  event PriceUpdated(uint indexed tokenId, uint newPrice, address from);
  event Collected(uint indexed tokenId, uint taxAmount, address from);
  event Bought(uint indexed tokenId, uint paidAmount, uint latestPrice, address from);
  event Refunded(uint indexed tokenId, uint refund, address to);
  event Reclaimed(uint indexed tokenId, address from);

  uint32 private constant TAX_DENOMINATOR = 1000000;
  uint32 private constant TAX_NUMERATOR = 10000; // 1%, make configurable
  uint32 private constant TAX_INTERVAL = 1 hours;

  // Mapping from creator to list of token IDs
  mapping(address => uint[]) private _createdTokens;

  // Who receives taxes from taxes
  mapping(uint => address) private _tokenCreator;

  // Harberger Tax variables
  // TODO: make into struct?
  mapping(uint => uint) public taxes;
  mapping(uint => uint) public prices;
  mapping(uint => uint) public paidThru;

  constructor () public ERC721Full("Patronage Collectibles", "PAT") {}

  /**
  * @dev Throws if called by any account other than the owner of a tokenId.
  */
  modifier onlyOwnerOf(uint tokenId) {
      require(exists(tokenId), "Token doesn't exist.");
      require(ownerOf(tokenId) == msg.sender, "Caller is not the token owner");
      _;
  }

  /**
    * @dev Function to mint tokens. From ERC721MetadataMintable
    * @param tokenId The token id to mint.
    * @param tokenURI The token URI of the minted token.
    * @return A boolean that indicates if the operation was successful.
    */
  function mint(uint tokenId, string memory tokenURI) public returns (bool) {
      address creator = msg.sender;

      _createdTokens[creator].push(tokenId); // Track a Creator's tokens
      _tokenCreator[tokenId] = creator;

      // HTax parameters
      prices[tokenId] = 0;
      taxes[tokenId] = 0;
      paidThru[tokenId] = now;

      _mint(creator, tokenId); // Initially, the creator owns the token but is 'in recovery'
      _setTokenURI(tokenId, tokenURI);

      emit Minted(tokenId, creator);
      return true;
  }

  // Buys a Collectible
  function buy(uint tokenId, uint newPrice) public payable { // TODO: must be nonreentrant
    uint paidAmount = msg.value;

    collect(tokenId); // Collect taxes
    reclaim(tokenId); // Reclaim if possible to lower price to 0

    uint latestPrice = prices[tokenId];
    require(paidAmount >= latestPrice, 'Insufficient amount paid.');

    address previousOwner = _tokenOwner[tokenId];
    require(msg.sender != previousOwner, 'You are already the owner.');
    address payable beneficiary = address(uint160(previousOwner));
    uint excessTaxes = taxes[tokenId]; // Refund excess taxes to previous owner

    // Change owner
    address newOwner = msg.sender;
    uint excessPaidAmount = paidAmount - latestPrice; // TODO: use SafeMath.sub()
    taxes[tokenId] = excessPaidAmount; // Excess paid is deposited as taxes
    paidThru[tokenId] = now;
    _changeOwner(tokenId, previousOwner, newOwner);
    prices[tokenId] = newPrice;
    emit Bought(tokenId, paidAmount, latestPrice, newOwner);

    uint refund = excessTaxes + latestPrice;
    emit Refunded(tokenId, refund, beneficiary);

    // TOFIX: fails because insufficient balance
    // address(this).balance = 1860
    beneficiary.transfer(refund); // Transfer remaining taxes + profit to previous owner
  }

  // Collect taxes
  // Forbid collection of collectibles with zero balances
  function collect(uint tokenId) public {
    uint owed = taxOwed(tokenId);
    address payable beneficiary = address(uint160(creatorOf(tokenId)));
    uint balance = taxes[tokenId];

    if (owed > balance) { // insufficient tax deposited
      taxes[tokenId] -= balance;
      paidThru[tokenId] += (now - paidThru[tokenId]) * balance / owed;
      emit Collected(tokenId, balance, msg.sender);
      beneficiary.transfer(balance);
    } else { // enough tax deposited
      taxes[tokenId] -= owed;
      paidThru[tokenId] = now;
      emit Collected(tokenId, owed, msg.sender);
      beneficiary.transfer(owed); // Pay creator
    }
  }

  // Reclaim tokens if taxes are underpaid
  function reclaim(uint tokenId) public {
    if(canReclaim(tokenId)) {
      _changeOwner(tokenId, _tokenOwner[tokenId], address(0)); // Unowned

      // Reset price, tax balance, and taxes owed
      prices[tokenId] = 0;
      taxes[tokenId] = 0;
      paidThru[tokenId] = now;

      emit Reclaimed(tokenId, msg.sender);
    }
  }

  // Pay taxes
  function deposit(uint tokenId) public payable onlyOwnerOf(tokenId) {
    uint amount = msg.value;

    require(taxOwed(tokenId) <= amount, 'Must deposit enough taxes to cover unpaid.');
    taxes[tokenId] += amount;
    emit Deposited(tokenId, amount, msg.sender);
  }

  // Update token price
  function setPrice(uint tokenId, uint newPrice) public onlyOwnerOf(tokenId) {
    collect(tokenId);
    require(!canReclaim(tokenId), 'Must fully pay taxes first before changing price.');

    prices[tokenId] = newPrice;
    emit PriceUpdated(tokenId, newPrice, msg.sender);
  }

  function taxOwed(uint tokenId) public view returns (uint) {
    uint tokenPrice = prices[tokenId];

    return tokenPrice * (now - paidThru[tokenId]) * TAX_NUMERATOR
        / TAX_DENOMINATOR / TAX_INTERVAL;
  }

  function exists(uint tokenId) public view returns (bool) {
      return _exists(tokenId);
  }

  function tokensOfCreator(address creator) public view returns (uint[] memory) {
    return _tokensOfCreator(creator);
  }

  function tokensOfOwner(address owner) public view returns (uint[] memory) {
      return _tokensOfOwner(owner);
  }

  function info(uint tokenId) public view returns (address, address, uint, uint, bool) {
    address creator = creatorOf(tokenId);
    address owner = ownerOf(tokenId);
    uint taxBalance = taxes[tokenId];
    uint price = prices[tokenId];
    bool canReclaim = canReclaim(tokenId);
  
    return (creator, owner, taxBalance, price, canReclaim);
  }

  /**
    * @dev Gets the creator of the specified token ID.
    * @param tokenId uint ID of the token to query the creator of
    * @return address currently marked as the creator of the given token ID
    */
  function creatorOf(uint tokenId) public view returns (address) {
      address creator = _tokenCreator[tokenId];
      require(creator != address(0), "ERC721: creator query for nonexistent token");

      return creator;
  }

  function canReclaim(uint tokenId) public view returns (bool) {
      return (ownerOf(tokenId) != address(0) && prices[tokenId] > 0 && taxOwed(tokenId) > taxes[tokenId]);
  }

  function _changeOwner(uint tokenId, address oldOwner, address newOwner) internal {
    _removeTokenFromOwnerEnumeration(oldOwner, tokenId);
    _tokenOwner[tokenId] = newOwner;
    _addTokenToOwnerEnumeration(newOwner, tokenId);
  }

  /**
  * @dev Gets the list of token IDs of the requested creator.
  * @param creator address who created the tokens
  * @return uint[] List of token IDs owned by the requested address
  */
  function _tokensOfCreator(address creator) internal view returns (uint[] storage) {
      return _createdTokens[creator];
  }
}