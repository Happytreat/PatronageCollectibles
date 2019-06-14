pragma solidity ^0.5.4;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";


contract PatronageCollectibles is ERC721Full {
  event Minted(uint indexed tokenId, address from);
  event Deposited(uint indexed tokenId, uint value, address from);
  event PriceUpdated(uint indexed tokenId, uint newPrice, address from);

  uint32 private constant MAX_TAX_DENOMINATOR = 100;

  // Mapping from creator to list of token IDs
  mapping(address => uint[]) private _createdTokens;

  // Who receives taxes from taxes
  mapping(uint => address) private _tokenCreator;

  // Harberger Tax variables
  // TODO: make into struct?
  mapping(uint => uint) public taxes;
  mapping(uint => uint) public prices;
  mapping(uint => uint) public taxRates; // HTax rate
  mapping(uint => uint) public taxIntervals;
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
      taxRates[tokenId] = 5; // 5%
      paidThru[tokenId] = now;

      _mint(creator, tokenId); // Initially, the creator owns the token but is 'in recovery'
      _setTokenURI(tokenId, tokenURI);

      emit Minted(tokenId, creator);
      return true;
  }

  // Pay taxes
  function deposit(uint tokenId) public payable onlyOwnerOf(tokenId) {
    taxes[tokenId] += msg.value;
    emit Deposited(tokenId, msg.value, msg.sender);
  }

  // Update token price
  function setPrice(uint tokenId, uint newPrice) public onlyOwnerOf(tokenId) {
    prices[tokenId] = newPrice;
    emit PriceUpdated(tokenId, newPrice, msg.sender);
  }

  function taxDue(uint tokenId) public view returns (uint) {
    uint tokenPrice = prices[tokenId];

    return tokenPrice * (now - paidThru[tokenId]) * taxRates[tokenId]
        / MAX_TAX_DENOMINATOR / 1 hours;
  }

  // TODO: functions for buy, setPrice, deposit taxes (Wallet Contract?)

  function exists(uint tokenId) public view returns (bool) {
      return _exists(tokenId);
  }

  function tokensOfCreator(address creator) public view returns (uint[] memory) {
    return _tokensOfCreator(creator);
  }

  function tokensOfOwner(address owner) public view returns (uint[] memory) {
      return _tokensOfOwner(owner);
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

  // TODO: Forbid transfers
  // function _transferFrom(address from, address to, uint tokenId) internal {
  //   revert('Transfers Disallowed');
  // }

  /**
  * @dev Gets the list of token IDs of the requested creator.
  * @param creator address who created the tokens
  * @return uint[] List of token IDs owned by the requested address
  */
  function _tokensOfCreator(address creator) internal view returns (uint[] storage) {
      return _createdTokens[creator];
  }
}