const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const periodFactory = require('./build/PeriodManager.json');

const provider = new HDWalletProvider(
    'useful announce level engage crater pride student spare plastic deer feel fault',
    'https://rinkeby.infura.io/v3/f7d5b3b7b4064c1aa17acbc0c1e44c72'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(periodFactory.interface))
        .deploy({ data: '0x' + periodFactory.bytecode }) // add 0x bytecode
        .send({ from: accounts[0] }); // remove 'gas'

    console.log('Contract deployed', result.options.address);
}
deploy();

// Attempting to deploy from account 0x0317a478B55Db24aD69fD38225d8588CF8b5A315

// 0x62d729ABCb9e39ffd828EDF8DDf8c2d899D04aEB
// 0x694bC191460FA90bC0124a263D3b5CA49683d956
// Contract deployed 0x1391498B6c451EE35B31485Bc2C73540E9909eC3