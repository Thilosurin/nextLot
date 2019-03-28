const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    accID: Number,
    accAddress: String
})

module.exports = mongoose.model("Account", accountSchema);