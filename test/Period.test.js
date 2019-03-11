const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledManager = require('../ethereum/build/PeriodManager.json');
const compiledPeriod = require('../ethereum/build/Period.json');

let accounts;
let factory;
let periodAddress;
let period;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(
        JSON.parse(compiledManager.interface))
        .deploy({ data: compiledManager.bytecode })
        .send({ from: accounts[0], gas: '3000000' });

    await factory.methods.createPeriod('200000', '2', '1555144287')
        .send({ from: accounts[0], gas: '3000000' });

    [periodAddress] = await factory.methods.getDeployedPeriods().call();
    period = await new web3.eth.Contract(
        JSON.parse(compiledPeriod.interface),
        periodAddress
    );
});

describe('Periods', () => {
    it('deploys a factory and a period', () => {
        assert.ok(factory.options.address);
        assert.ok(period.options.address);
    });

    // it('Create Periods', async () => {
    //     const createPeriod = await factory.methods
    //         .createPeriod('200000', '2', '1555115750')
    //         .send({ from: accounts[0], gas: '1000000' })

    //     console.log(createPeriod);
    // });

    it('marks caller as the period creator', async () => {
        const creator = await period.methods.creator().call();
        assert.equal(accounts[0], creator);
    });

    it('player can create lottery', async () => {
        await period.methods.createLottery('477477').send({
            value: '200000',
            from: accounts[1],
            gas: '1000000'
        });
        const lottery = await period.methods.lotteries(0).call();
        assert.equal('477477', lottery.numberLottery);
    });

    it('requires a price create lottery', async () => {
        try {
            await period.methods.createLottery().send({
               value: '100000',
               from: accounts[1] 
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('reward process = check reward + get reward', async () => {
        await period.methods.createLottery('477477').send({
            value: '200000',
            from: accounts[1],
            gas: '1000000'
        });

        await period.methods.createLottery('477477').send({
            value: '200000',
            from: accounts[2],
            gas: '1000000'
        });
        
        await period.methods.checkReward('477477', web3.utils.toWei('5', 'ether')).send({
            from: accounts[0],
            gas: '1000000'
        });
        
        await period.methods.sendReward().send({
            value: web3.utils.toWei('10', 'ether'),
            from: accounts[0],
            gas: '1000000'
        });
        
        const lottery1 = await period.methods.lotteries(0).call();
        const lottery2 = await period.methods.lotteries(1).call();
        
        assert.equal('477477', lottery1.numberLottery);
        assert.equal('477477', lottery2.numberLottery);
        
        console.log(lottery1.prize);
        assert.equal(web3.utils.toWei('5', 'ether'), lottery1.prize);
        assert.equal(web3.utils.toWei('5', 'ether'), lottery2.prize);
        
        const getCheckReward = await period.methods.getCheckReward().call();
        console.log(getCheckReward[0]);
        console.log(getCheckReward[1]);
        assert.equal(web3.utils.toWei('10', 'ether'), getCheckReward[0]);
        assert.equal('2', getCheckReward[1]);
                
        assert.equal(true, lottery1.reward);
    });

    it('add new message', async () => {
        await period.methods.addMessage('Hello World!').send({
            from: accounts[0]
        });
        const msg = await period.methods.getMessages(0).call();
        assert.equal('Hello World!', msg);
    });

    it('test getPeriodInfo()', async () => {
        const periodInfo = await period.methods.getPeriodInfo().call()
    
        console.log(periodInfo);
    })
});