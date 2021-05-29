const mongoose = require("mongoose");

const signupTemplate = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    enrollmentid: {type: String, required: true},
    rollNo: {type: String, required: true},
    date: { type: Date }
});

module.exports = signuptemplate = mongoose.model("users", signupTemplate);