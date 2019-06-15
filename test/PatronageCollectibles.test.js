const { assertEvent, expectThrow, timeTravel } = require('./helpers');

const PatronageCollectibles = artifacts.require("PatronageCollectibles.sol");

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const TEST_TOKEN_ID = 123;
const NEW_TOKEN_ID = 111;
const TEST_URI = 'mock://mytoken';
const TEST_DEPOSIT = 100;
const TEST_PRICE = 1000;
const SECONDS_IN_A_DAY = 86400;

contract('PatronageCollectibles', ([creator, patron, patron2, stranger]) => {
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

    const info = await this.collectibles.info(TEST_TOKEN_ID);
    assert(info);
    // {"0":"0xD5F9cd0cdb7e2A390e6fB74fB04cf2399297ABC2","1":"0xD5F9cd0cdb7e2A390e6fB74fB04cf2399297ABC2","2":"0","3":"0","4":false}
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
    const canReclaimBefore = await this.collectibles.canReclaim(TEST_TOKEN_ID);
    assert.equal(canReclaimBefore, false);

    await timeTravel(SECONDS_IN_A_DAY * 1); // Wait 24 hours

    const taxOwed = await this.collectibles.taxOwed(TEST_TOKEN_ID);
    assert.equal(taxOwed.toString(), "240"); // Tax is 1% * 24 per day off 1000

    const canReclaim = await this.collectibles.canReclaim(TEST_TOKEN_ID);
    assert.equal(canReclaim, true);
  });

  it('can collect taxes', async () => {
    const oldBalance = await web3.eth.getBalance(creator);

    const taxBalance = await this.collectibles.taxes(TEST_TOKEN_ID);
    assert.equal(taxBalance, 100);

    const taxOwed = await this.collectibles.taxOwed(TEST_TOKEN_ID);
    assert.equal(taxOwed, 240);

    const taxAmount = taxBalance;
    
    const result = await this.collectibles.collect(TEST_TOKEN_ID);
    assertEvent(result, {
      event: 'Collected',
      args: {
        tokenId: TEST_TOKEN_ID,
        taxAmount: taxAmount.toNumber(),
        from: creator,
      },
    }, 'A Collected event is emitted.');

    // check remaining tax owed
    const newTaxOwed = await this.collectibles.taxOwed(TEST_TOKEN_ID);
    assert.equal(newTaxOwed, (240 - taxAmount));

    const canReclaim = await this.collectibles.canReclaim(TEST_TOKEN_ID);
    assert.equal(canReclaim, true);
  });

  it('can reclaim underpaid tokens', async () => {
    const canReclaim = await this.collectibles.canReclaim(TEST_TOKEN_ID);
    assert.equal(canReclaim, true);

    const result = await this.collectibles.reclaim(TEST_TOKEN_ID, { from: stranger });
    assertEvent(result, {
      event: 'Reclaimed',
      args: {
        tokenId: TEST_TOKEN_ID,
        from: stranger,
      },
    }, 'A Reclaimed event is emitted.');

    const newOwner = await this.collectibles.ownerOf(TEST_TOKEN_ID);
    assert.equal(newOwner, ZERO_ADDRESS);

    const newTaxOwed = await this.collectibles.taxOwed(TEST_TOKEN_ID);
    assert.equal(newTaxOwed, 0);

    const newPrice = await this.collectibles.prices(TEST_TOKEN_ID);
    assert.equal(newPrice, 0);
  });

  it('can buy a fresh collectible', async () => {
    await this.collectibles.mint(NEW_TOKEN_ID, TEST_URI, { from:creator });

    const taxBalance = await this.collectibles.taxes(TEST_TOKEN_ID);
    assert.equal(taxBalance, 0);

    const taxOwed = await this.collectibles.taxOwed(TEST_TOKEN_ID);
    assert.equal(taxOwed, 0);

    const taxAmount = taxBalance;

    const result = await this.collectibles.buy(NEW_TOKEN_ID, TEST_PRICE, { value: TEST_DEPOSIT, from: patron });
    assertEvent(result, {
      event: 'Collected',
      args: {
        tokenId: NEW_TOKEN_ID,
        taxAmount: taxAmount.toNumber(),
        from: patron,
      },
    }, 'A Collected event is emitted.');   
    assertEvent(result, {
      event: 'Bought',
      args: {
        tokenId: NEW_TOKEN_ID,
        paidAmount: TEST_DEPOSIT,
        latestPrice: 0,
        from: patron,
      },
    }, 'A Bought event is emitted.', 1);

    const newOwner = await this.collectibles.ownerOf(NEW_TOKEN_ID);
    assert.equal(newOwner, patron);

    const newPrice = await this.collectibles.prices(NEW_TOKEN_ID);
    assert.equal(newPrice, TEST_PRICE);    
  });

  it('can buy a reclaimable collectible', async () => {
    await timeTravel(SECONDS_IN_A_DAY * 1); // Wait 24 hours

    const taxOwed = await this.collectibles.taxOwed(NEW_TOKEN_ID);
    assert.equal(taxOwed, 240);

    const taxBalance = await this.collectibles.taxes(NEW_TOKEN_ID);
    assert.equal(taxBalance, 100);

    const canReclaim = await this.collectibles.canReclaim(NEW_TOKEN_ID);
    assert.equal(canReclaim, true);

    const taxAmount = taxBalance;

    const result = await this.collectibles.buy(NEW_TOKEN_ID, TEST_PRICE, { value: TEST_DEPOSIT, from: patron2 });
    assertEvent(result, {
      event: 'Collected',
      args: {
        tokenId: NEW_TOKEN_ID,
        taxAmount: taxAmount.toNumber(),
        from: patron2,
      },
    }, 'A Collected event is emitted.');
    assertEvent(result, {
      event: 'Reclaimed',
      args: {
        tokenId: NEW_TOKEN_ID,
        from: patron2,
      },
    }, 'A Reclaimed event is emitted.', 1);    
    assertEvent(result, {
      event: 'Bought',
      args: {
        tokenId: NEW_TOKEN_ID,
        paidAmount: TEST_DEPOSIT,
        latestPrice: 0,
        from: patron2,
      },
    }, 'A Bought event is emitted.', 2);

    const newOwner = await this.collectibles.ownerOf(NEW_TOKEN_ID);
    assert.equal(newOwner, patron2);
  });

  it('can buy collectible with excess taxes', async () => {
    await timeTravel(SECONDS_IN_A_DAY * 1); // Wait 24 hours

    const taxOwed = await this.collectibles.taxOwed(NEW_TOKEN_ID);
    assert.equal(taxOwed, 240);

    const taxBalance = await this.collectibles.taxes(NEW_TOKEN_ID);
    assert.equal(taxBalance, 100);

    await this.collectibles.deposit(NEW_TOKEN_ID, { from:patron2, value: 1000 });

    const newTaxBalance = await this.collectibles.taxes(NEW_TOKEN_ID);
    assert.equal(newTaxBalance, 1100);

    const canReclaim = await this.collectibles.canReclaim(NEW_TOKEN_ID);
    assert.equal(canReclaim, false);

    const result = await this.collectibles.buy(NEW_TOKEN_ID, TEST_PRICE, { value: TEST_PRICE, from: patron });
    assertEvent(result, {
      event: 'Refunded',
      args: {
        tokenId: NEW_TOKEN_ID,
        refund: 2100,
        to: patron2,
      },
    }, 'A Refunded event is emitted.', 2);

    const newOwner = await this.collectibles.ownerOf(NEW_TOKEN_ID);
    assert.equal(newOwner, patron);
  });
});
