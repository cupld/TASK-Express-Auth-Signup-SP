const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {type: String , unique:true, required:true},
    password: {type: String ,required:true} ,
    email: {type: String, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    firstName: {type: String} ,
    lastName: {type: String} ,
});

module.exports = mongoose.model ("User", UserSchema);