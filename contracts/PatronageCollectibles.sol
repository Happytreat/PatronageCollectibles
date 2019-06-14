pragma solidity ^0.5.8;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";


contract PatronageCollectibles is ERC721Full {
  constructor () public ERC721Full("Patronage Collectibles", "PAT") {}

  // TODO: need to keep track of tokens minted by a Creator (array of tokenIDs)
  // See IERC721Enumerable

  /**
    * @dev Function to mint tokens. From ERC721MetadataMintable
    * @param to The address that will receive the minted tokens.
    * @param tokenId The token id to mint.
    * @param tokenURI The token URI of the minted token.
    * @return A boolean that indicates if the operation was successful.
    */
  function mintWithTokenURI(address to, uint256 tokenId, string memory tokenURI) public returns (bool) {
      _mint(to, tokenId);
      _setTokenURI(tokenId, tokenURI);
      return true;
  }

  // TODO: tokensOfCreator(address creator)

  function tokensOfOwner(address owner) public view returns (uint256[] memory) {
      return _tokensOfOwner(owner);
  }
}