const mongoose = require('mongoose');
const Period = mongoose.model('Period');

exports.createdPeriod = async (req, res) => {
    const periodData = req.body;
    const period = new Period({
        prID: periodData[0],
        prLotteryPrice: periodData[1],
        prAN: periodData[2],
        prOpening: periodData[3],
        prClosingTime: new Date(periodData[4]*1000),
        prAddressCreator: periodData[5],
        // prReward: periodData[0], // add before : set Reward
    });
    period.seve()
        .then(() => Period.findOne({ prID: !periodData[0] }))
    res.json(period)
};