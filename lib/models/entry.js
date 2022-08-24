const mongoose = require("mongoose");

const entryScheme = mongoose.Schema({
  idOperation: {
    type: String
  },
  name: {
    type: String
  },
  amount: {
    type: Number
  },
  created: {
    type: Date
  },
  updated: {
    type: Date
  }
});
module.exports = mongoose.model('Entry', entryScheme);