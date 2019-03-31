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
    tkPeriod: [{ type: ObjectId, ref: "Period" }],
    tkPlayerBuy: [{ type: ObjectId, ref: "User" }],
    tkCreatedAt: {
      type: Date,
      default: Date.now
    }
  },
  /* don't want to create our indices every time (nice for development, but can result in a performance hit) */
  { autoIndex: false }
);

/* Kind of like a middleware function after creating our schema (since we have access to next) */
/* Must be a function declaration (not an arrow function), because we want to use 'this' to reference our schema */
const autoPopulateTicketBy = function(next) {
  this.populate("tkPlayerBuy", "_id name account");
  this.populate("tkPeriod", "_id prID prAddress prOpening prCreatedAt");
  next();
};

/* We're going to need to populate the 'postedBy' field virtually every time we do a findOne / find query, so we'll just do it as a pre hook here upon creating the schema */
ticketSchema
  .pre("findOne", autoPopulateTicketBy)
  .pre("find", autoPopulateTicketBy);
/* Create index on keys for more performant querying/post sorting */
ticketSchema.index({ tkPeriod: 1, createdAt: 1 });

module.exports = mongoose.model("Ticket", ticketSchema);