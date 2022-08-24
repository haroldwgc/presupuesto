const mongoose = require("mongoose");

const budgetScheme = mongoose.Schema({
  idOperation: {
    type: String
  },
  idCategory: {
    type: String
  },
  type: {
    type: String
  },
  amount: {
    type: Number
  }
});
module.exports = mongoose.model('Budget', budgetScheme);