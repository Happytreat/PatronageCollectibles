const { assertEvent, expectThrow, timeTravel } = require('./helpers');

const PatronageCollectibles = artifacts.require("PatronageCollectibles.sol");

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const TEST_TOKEN_ID = 123;
const TEST_URI = 'mock://mytoken';
const TEST_DEPOSIT = 100;
const TEST_PRICE = 1000;
const SECONDS_IN_A_DAY = 86400;

contract('PatronageCollectibles', ([creator, patron, stranger]) => {
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
    const result = await this.collectibles.mint(TEST_TOKEN_ID, TEST_URI, { from:creator });
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

    const URI = await this.collectibles.tokenURI(TEST_TOKEN_ID);
    assert.equal(URI, TEST_URI);

    const ownedTokens = await this.collectibles.tokensOfOwner(creator);
    assert.equal(ownedTokens.length, 1);
    assert.equal(ownedTokens[0], TEST_TOKEN_ID);

    const createdTokens = await this.collectibles.tokensOfCreator(creator);
    assert.equal(createdTokens.length, 1);
    assert.equal(createdTokens[0], TEST_TOKEN_ID);
  });

  it('Owners can deposit taxes and view the balance', async () => {
    const oldTaxBalance = await this.collectibles.taxes(TEST_TOKEN_ID);
    assert.equal(oldTaxBalance, 0);

    const result = await this.collectibles.deposit(TEST_TOKEN_ID, { from:creator, value: TEST_DEPOSIT });
    assertEvent(result, {
      event: 'Deposited',
      args: {
        from: creator,
        value: TEST_DEPOSIT,
        tokenId: TEST_TOKEN_ID,
      },
    }, 'A Deposited event is emitted.', 0);

    const newTaxBalance = await this.collectibles.taxes(TEST_TOKEN_ID);
    assert.equal(newTaxBalance, TEST_DEPOSIT);
  });

  it('Non-owners cannot deposit taxes', async () => {
    await expectThrow(this.collectibles.deposit(TEST_TOKEN_ID, { from: stranger, value: TEST_DEPOSIT }));
  });

  it('Owners can set the price of their token', async () => {
    const oldPrice = await this.collectibles.prices(TEST_TOKEN_ID);
    assert.equal(oldPrice, 0);

    const result = await this.collectibles.setPrice(TEST_TOKEN_ID, TEST_PRICE, { from: creator });
    assertEvent(result, {
      event: 'PriceUpdated',
      args: {
        from: creator,
        newPrice: TEST_PRICE,
        tokenId: TEST_TOKEN_ID,
      },
    }, 'A PriceUpdated event is emitted.');

    const newPrice = await this.collectibles.prices(TEST_TOKEN_ID);
    assert.equal(newPrice, TEST_PRICE);
  });

  it('Non-owners cannot set prices', async () => {
    await expectThrow(this.collectibles.setPrice(TEST_TOKEN_ID, TEST_PRICE, { from: stranger }));
  });

  it('taxes are due over time', async () => {
    await timeTravel(SECONDS_IN_A_DAY * 1); // Wait 24 hours

    const taxes = await this.collectibles.taxOwed(TEST_TOKEN_ID);
    assert.equal(taxes.toString(), "240"); // Tax is 1% * 24 per day off 1000
  });  
});
