const mongoose = require("mongoose");
const userScheme = mongoose.Schema({
    user: {
        type: String
    },
    mail: {
        type: String
    }, 
    mail: {
        type: String
    }, 
    password: {
        type: String
    }, 
    created: {
        type: Date
    }
});

module.exports=mongoose.model('User',userScheme);