const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const rounds = 10;

const _user = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

_user.pre("save", function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.hash(user.password, rounds, function (hashErr, hash) {
      if (hashErr) {
        next(hashErr);
      }
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

_user.pre("findOneAndUpdate", function (next) {
  const user = this.update;
  if (user.password) {
    bcrypt.hash(user.password, rounds, function (hashErr, hash) {
      if (hashErr) {
        next(hashErr);
      }
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

_user.methods.comparePassword = function (pws, cb) {
  bcrypt.compare(pws, this.password, function (compareErr, isMatch) {
    if (compareErr) {
      cb(compareErr);
    }
    cb(null, isMatch);
  });
};

mongoose.models = {};
var userModel = mongoose.model("users", _user);
module.exports = userModel;
