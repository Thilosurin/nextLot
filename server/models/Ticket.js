const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ticketSchema = new mongoose.Schema(
  {
    tkNumber: {
      type: Number,
      required: true
    },
    tkReward: {
      type: Boolean,
      default: false
    },
    tkPrize: {
      type: Number,
      default: 0
    },
    tkAccount: String,
    tkCreatedAt: {
      type: Date,
      default: Date.now
    },
    tkPeriod: [{ type: ObjectId, ref: "Period", required: true }],
    tkPlayerBuy: [{ type: ObjectId, ref: "User", required: true }],
  },
  { autoIndex: false }
);

const autoPopulateTicketBy = function(next) {
  this.populate("tkPlayerBuy", "_id name email");
  this.populate("tkPeriod", "_id prID prAccount prAddressCreator prOpening prCreatedAt prClosingTime");
  next();
};

ticketSchema
  .pre("findOne", autoPopulateTicketBy)
  .pre("find", autoPopulateTicketBy);

ticketSchema.index({ tkPlayerBuy: 1, createdAt: 1 });

module.exports = mongoose.model("Ticket", ticketSchema);