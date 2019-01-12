const TokenGateway = artifacts.require('./TokenGateway.sol');
const DaiToken = artifacts.require('./DaiToken.sol');
const PaxToken = artifacts.require('./PaxToken.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
 .use(require('chai-as-promised'))
 .use(require('chai-bignumber')(BigNumber))
 .should();
 let sender, dai, pax;
contract('token_transfer', function(accounts) {
  let accountA, accountB, accountC, accountD;

  [accountA, accountB, accountC, accountD ] = accounts;

  beforeEach(async () => {
   sender = await TokenGateway.new();
   dai = await DaiToken.new();
   pax = await PaxToken.new();

   await sender.addNewToken('DAI', dai.address);
   await sender.addNewToken('PAX', pax.address);
  });

  it("should be able to transfer sender token to another wallet", async() => {
    // When transfering  token, multiple by
    //figure of decimal to get exact token e.g
    //to send 5 BEAR = 5e5, where 5 is the decimal places
    let amount = new BigNumber(500000e5);

    //Account a approve contract to spend on behalf
    await dai.approve(sender.address, amount,{from: accountA});

    await sender.transferTokens('DAI',accountB, amount,{from: accountA});

    let balance = ((await dai.balanceOf(accountB)).toString());

    balance.should.equal(amount.toString())
  });

    it("should be able to transfer sender token to tokenGateway", async() => {
        // When transfering  token, multiple by
        //figure of decimal to get exact token e.g
        //to send 5 BEAR = 5e5, where 5 is the decimal places
        let amount = new BigNumber(500000e5);

        //Account a approve contract to spend on behalf
        await dai.approve(sender.address, amount,{from: accountA});

        await sender.deposit('DAI', amount,{from: accountA});

        let balance = ((await sender.balanceOfAvailable(accountA, 'DAI')).toString());

        balance.should.equal(amount.toString())

        balance = ((await sender.balanceOf(accountA, 'DAI')).toString());

        balance.should.equal(amount.toString())

    });

    it("should be able to freeze  token by tokenGateway owner", async() => {
        // When transfering  token, multiple by
        //figure of decimal to get exact token e.g
        //to send 5 BEAR = 5e5, where 5 is the decimal places
        let amount = new BigNumber(500000e5);

        //Account a approve contract to spend on behalf
        await dai.approve(sender.address, amount,{from: accountA});

        await sender.deposit('DAI', amount,{from: accountA});

        let balance = ((await sender.balanceOfAvailable(accountA, 'DAI')).toString());

        balance.should.equal(amount.toString())

        amount = new BigNumber(100000e5);

        await sender.freezeToken(accountA, 'DAI', amount,{from: accountA});

        balance = ((await sender.balanceOfFreezed(accountA, 'DAI')).toString());


        balance.should.equal(amount.toString())


    });

    it("should be able to deposit to contract", async() => {
        // When transfering  token, multiple by
        //figure of decimal to get exact token e.g
        //to send 5 BEAR = 5e5, where 5 is the decimal places
        let amount = new BigNumber(500000e5);

        //Account a approve contract to spend on behalf
        await dai.approve(sender.address, amount,{from: accountA});

        await sender.transferTokens('DAI',accountB, amount,{from: accountA});

        let balance = ((await dai.balanceOf(accountB)).toString());

        balance.should.equal(amount.toString())

        await dai.approve(sender.address, amount,{from: accountB});
        await sender.deposit('DAI', amount,{from: accountB});

        let balance2 = ((await sender.balanceOfAvailable(accountB, 'DAI')).toString());
        balance2.should.equal(amount.toString())

        let amount2 = new BigNumber(100000e5);

        await sender.freezeToken(accountB, 'DAI', amount2,{from: accountA});

        let balance3 = ((await sender.balanceOfFreezed(accountB, 'DAI')).toString());

        balance3.should.equal(amount2.toString());
    });



});
