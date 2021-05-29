const mongoose = require("mongoose");

const facultyTemplate = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    domainname: {type: String, required: true},
    facultyid: {type: String, required: true}
});

module.exports = facultytemplate = mongoose.model("faculties", facultyTemplate);