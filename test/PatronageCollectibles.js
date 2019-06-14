const { assertEvent } = require('./helpers');

const PatronageCollectibles = artifacts.require("PatronageCollectibles.sol");

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

contract('PatronageCollectibles', ([creator, patron]) => {
  before(async () => {
    this.collectibles = await PatronageCollectibles.new();
  });

  it('should initialize correctly', async () => {
    const name = await this.collectibles.name();
    assert.equal(name, "Patronage Collectibles");

    const symbol = await this.collectibles.symbol();
    assert.equal(symbol, "PAT");
  });

  it('Creators should be able to mint new Collectibles', async () => {
    const TEST_TOKEN_ID = 123;
    const TEST_URI = 'mock://mytoken';

    const result = await this.collectibles.mint(TEST_TOKEN_ID, TEST_URI);
    assertEvent(result, {
      event: 'Transfer',
      args: {
        from: ZERO_ADDRESS,
        to: creator,
        tokenId: TEST_TOKEN_ID,
      },
    }, 'A Transfer event is emitted.', 0);

    const tokenCreator = await this.collectibles.creatorOf(TEST_TOKEN_ID);
    assert.equal(tokenCreator, creator);

    const tokenOwner = await this.collectibles.ownerOf(TEST_TOKEN_ID);
    assert.equal(tokenOwner, creator);
  });
});
