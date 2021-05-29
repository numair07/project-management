const mongoose = require("mongoose");

const projectDetailTemplate = new mongoose.Schema({
    projectName : {type: String, required: true},
    domainName : {type: String, required: true},
    facultyid : {type: String, required: true},
    teamMemberCount : {type: String, required: true},
    memberOne: {type: String, required: true},
    memberTwo: {type: String, required: true},
    memberThree: {type: String, required: true}
});

module.exports = projectDetailtemplate = mongoose.model("projects", projectDetailTemplate);