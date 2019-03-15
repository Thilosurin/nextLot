import web3 from './web3';

import PeriodFactory from './build/PeriodManager.json';

const instance = new web3.eth.Contract(
    JSON.parse(PeriodFactory.interface),
    '0x2B7f7d141ADdEE64Fe967da3b5c2518d81c41a8B'
);

export default instance;