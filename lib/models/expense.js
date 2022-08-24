const mongoose = require("mongoose");

const expenseScheme = mongoose.Schema({
  idOperation: {
    type: String
  },
  nameCategory: {
    type: String
  },
  iconCategory: {
    type: String
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  amount: {
    type: Number
  },
  dateAmount: {
    type: Date
  },
  created: {
    type: Date
  },
  updated: {
    type: Date
  }
});
module.exports = mongoose.model('Expense', expenseScheme);