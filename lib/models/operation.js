const mongoose = require("mongoose");

const operationScheme = mongoose.Schema({
  name: {
    type: String
  },
  idUser: {
    type: String
  },
  created: {
    type: Date
  }
});
module.exports = mongoose.model('Operation', operationScheme);