const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const periodSchema = new mongoose.Schema({
    prID: Number,
    prAddress: String,
    prLotteryPrice: Number,
    prAN: Number,
    prOpening: Boolean,
    prCreatedAt: Date,
    prAddressCreator: String,
    prReward: [{ type: ObjectId, ref: "Reward" }]
})

module.exports = mongoose.model("Period", periodSchema);