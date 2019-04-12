const mongoose = require('mongoose');
const Period = mongoose.model('Period');

exports.createdPeriod = async (req, res) => {
    const periodData = req.body;

    const prID = periodData[0];
    const prLotteryPrice = periodData[1];
    const prAN = periodData[2];
    const prOpening = periodData[3];
    const prClosingTime = new Date(periodData[4]*1000);
    const prAddressCreator = periodData[5];
    const prAccount = periodData.address;

    const period = new Period({ prID, prAccount, prLotteryPrice, prAN, prOpening, prClosingTime, prAddressCreator });
    
    period.save();
    
    res.json(period)
};


// prReward: periodData[0], // add before : set Reward