const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  id: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = model("users", UserSchema);
