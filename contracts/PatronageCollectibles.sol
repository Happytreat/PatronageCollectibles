pragma solidity ^0.5.4;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";


contract PatronageCollectibles is ERC721Full {
  event Minted(uint indexed tokenId, address from);
  event Deposited(uint indexed tokenId, uint value, address from);
  event PriceUpdated(uint indexed tokenId, uint newPrice, address from);

  // Mapping from creator to list of token IDs
  mapping(address => uint[]) private _createdTokens;

  // Who receives taxes from taxes
  mapping(uint => address) private _tokenCreator;

  // Harberger Tax variables
  mapping(uint => uint) private _taxes;
  mapping(uint => uint) private _prices;

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
      _mint(creator, tokenId); // Initially, the creator owns the token but is 'in recovery'
      _setTokenURI(tokenId, tokenURI);

      emit Minted(tokenId, creator);
      return true;
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

  // Pay taxes
  function deposit(uint tokenId) public payable onlyOwnerOf(tokenId) {
    _taxes[tokenId] += msg.value;
    emit Deposited(tokenId, msg.value, msg.sender);
  }

  // Update token price
  function setPrice(uint tokenId, uint newPrice) public onlyOwnerOf(tokenId) {
    _prices[tokenId] = newPrice;
    emit PriceUpdated(tokenId, newPrice, msg.sender);
  }

  // TODO: functions for buy, setPrice, deposit taxes (Wallet Contract?)
  function taxes(uint tokenId) public view returns (uint) {
    return _taxes[tokenId];
  }

  function price(uint tokenId) public view returns (uint) {
    return _prices[tokenId];
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

  // Forbid transfers
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