const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    accAddress: String,
    accEther: Number
})

module.exports = mongoose.model("Account", accountSchema);