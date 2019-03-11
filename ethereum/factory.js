import web3 from './web3';

import PeriodFactory from './build/PeriodManager.json';

const instance = new web3.eth.Contract(
    JSON.parse(PeriodFactory.interface),
    '0x1391498B6c451EE35B31485Bc2C73540E9909eC3'
);

export default instance;