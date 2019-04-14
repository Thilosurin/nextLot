const mongoose = require('mongoose');
const Period = mongoose.model('Period');
const Reward = mongoose.model('Reward');

exports.createdPeriod = async (req, res) => {
    const periodData = req.body;

    const prID = periodData[0];
    const prLotteryPrice = periodData[1];
    const prAN = periodData[2];
    const prOpening = periodData[3];
    const prClosingTime = new Date(periodData[4]*1000);
    const prAddressCreator = periodData[5];
    const prAccount = periodData.address;

    const period = await new Period({ prID, prAccount, prLotteryPrice, prAN, prOpening, prClosingTime, prAddressCreator }).save();
    
    res.json(period)
};

exports.createdReward = async (req, res) => {
    const rewardData = req.body;

    const rwNumber = rewardData[0].prizeNumber;
    const rwName = rewardData[0].nameReward;
    const rwPrize = rewardData[0].prizeReward;

    const reward = await new Reward({ rwNumber, rwName, rwPrize }).save();

    await Period.findOne({ prAccount: req.params.periodId })
                .then(period => {
                    period.prReward.push(reward._id)
                    Period.populate(period, { path: 'prReward', select: '_id rwNumber rwName rwPrize' })
                    return period.save()
                })
    res.json(reward)
}