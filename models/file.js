const mongoose = require("mongoose");

const _user = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};
var userModel = mongoose.model("files", _user);
module.exports = userModel;
