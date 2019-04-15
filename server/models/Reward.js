const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
    rwNumber: Number,
    rwName: String,
    rwPrize: Number,
    rwPlayerAmount: Number,
    rwTotalPrize: Number,
})

module.exports = mongoose.model("Reward", rewardSchema);