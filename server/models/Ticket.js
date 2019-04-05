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
      type: Number
    },
    tkPeriod: [{ type: ObjectId, ref: "Period", required: true }],
    tkPlayerBuy: [{ type: ObjectId, ref: "User", required: true }],
    tkCreatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { autoIndex: false }
);

const autoPopulateTicketBy = function(next) {
  this.populate("tkPlayerBuy", "_id name account");
  this.populate("tkPeriod", "_id prID prAddress prOpening prCreatedAt");
  next();
};

ticketSchema
  .pre("findOne", autoPopulateTicketBy)
  .pre("find", autoPopulateTicketBy);

ticketSchema.index({ tkPeriod: 1, createdAt: 1 });

module.exports = mongoose.model("Ticket", ticketSchema);