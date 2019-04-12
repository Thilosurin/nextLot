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

module.exports = mongoose.model("Period", periodSchema);