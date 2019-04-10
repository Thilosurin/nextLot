const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email is required"
    },
    name: {
      type: String,
      trim: true,
      unique: true,
      minlength: 4,
      maxlength: 10,
      required: "Name is required"
    },
    avatar: {
      type: String,
      required: "Avatar image is required",
      default: "/static/images/profile-image.jpg"
    },
    status: {
      type: Boolean,
      default: false
    },
    tickets: [{ type: ObjectId, ref: "Ticket" }]
  },
  { timestamps: true }
);

const autoPopulateTickers = function(next) {
  this.populate("tickets", "_id tkNumber tkReward tkPrize tkAccount tkCreatedAt tkPeriod");
  next();
};

userSchema.pre("findOne", autoPopulateTickers);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);