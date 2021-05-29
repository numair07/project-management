const mongoose = require("mongoose");

const projectCommit = new mongoose.Schema({
    projectid: {type: String, required: true},
    commitMessage: {type: String, required: true},
    projectUpdate: {type: String, required: true}
});

module.exports = projectcommit = mongoose.model("commits", projectCommit);