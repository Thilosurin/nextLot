const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const periodSchema = new mongoose.Schema({
    prID: Number,
    prAccount: String,
    prLotteryPrice: Number,
    prAN: Number,
    prOpening: Boolean,
    prClosingTime: Date,
    prCreatedAt: { type: Date, default: Date.now },
    prAddressCreator: String,
    prReward: [{ type: ObjectId, ref: "Reward" }]
})

const autoPopulateRewardBy = function(next) {
    this.populate("prReward", "_id rwNumber rwName rwPrize");
    next();
};

periodSchema
  .pre("findOne", autoPopulateRewardBy)
  .pre("find", autoPopulateRewardBy);

module.exports = mongoose.model("Period", periodSchema);