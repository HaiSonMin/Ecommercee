const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "User";
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide full name"],
      maxlength: 50,
    },
    contact: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ,
        "Please provide valid email",
      ],
      unique: true,
      required: [true, "Please provide email"],
      maxlength: 50,
    },
    username: {
      type: String,
      required: [true, "Please provide user name"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    // role: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Role",
    //   required: true,
    //   index: true,
    // },
    // siteInfoId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "SiteInfo",
    //   required: true,
    //   index: true,
    // },
    // shippingId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Shipping",
    //   required: true,
    //   index: true,
    // },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.getFullName = function () {
  return this.fullName;
};

userSchema.methods.getUsername = function () {
  return this.username;
};

userSchema.methods.getEmail = function () {
  return this.email;
};

// userSchema.methods.createJWT = function () {
//   return jwt.sign({ userId: this._id, userName: this.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
// };

userSchema.methods.comparePassword = async function (password) {
  const isMatchingPassword = await bcrypt.compare(password, this.password);
  return isMatchingPassword;
};

//Export the model
module.exports = mongoose.model(COLLECTION_NAME, userSchema);
