const mongoose = require("mongoose");

const categoryScheme = mongoose.Schema({
  type: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  icon: {
    type: String
  },
  created: {
    type: Date
  },
  updated: {
    type: Date
  }
});
module.exports = mongoose.model('Category', categoryScheme);