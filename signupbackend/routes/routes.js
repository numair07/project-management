const express = require("express");
const router = express.Router();

const signup = require("../models/signupModels");
const projects = require("../models/projectModel");
const faculty = require("../models/facultyModels");
const commit = require("../models/projectCommitModel");

router.post("/signup", async function(req, res) {

    const ifExistsUsername = await signup.findOne({username: req.body.username});
    const ifExistsEmail = await signup.findOne({email: req.body.email});
    const ifExistsEid = await signup.findOne({enrollmentid: req.body.enrollmentid});
    const ifExistRollNo = await signup.findOne({rollno: req.body.rollno});


    if(!ifExistsUsername && !ifExistsEmail && !ifExistRollNo && !ifExistsEid) {
        console.log("Will Insert in DB");
        const fullname = req.body.fullname;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const enrollmentid = req.body.enrollmentid;
        const rollno = req.body.rollno;
        const date = new Date();
        const newsignup = new signup({ fullname, username, email, password, enrollmentid, rollNo: rollno,date });
    
        try {
            const saveduser = await newsignup.save();
            res.json(saveduser);
        } catch (err) {
            console.error(err);
        }
    }else {
        if(ifExistsEmail) {
            res.send("EMAIL");
        }
        else if(ifExistsUsername) {
            res.send("USERNAME");
        }
        else if(ifExistsEid) {
            res.send("EID");
        }
        else if(ifExistRollNo) {
            res.send("ROLLNO");
        }
        
        console.log("Not Inserted In Database");
    }

    
});


router.post("/login", async function(req, res) {

    const ifExistsUsername = await signup.findOne({$or: [{username: req.body.email}, {email: req.body.email}]});

    if(ifExistsUsername) {
        const password = req.body.password;
        if (ifExistsUsername.password == password) {
            res.send(ifExistsUsername._id);
        }
        else {
            res.send("PASSWORD");
        }
    }else {
        res.send("EMAIL")
        console.log("Not Inserted In Database");
    }

    
});


router.get("/projects/:id", async (req, res) => {
    const getEid = await signup.findById(req.params.id);
    const eid = getEid.enrollmentid;
    const getProject = await projects.find({$or: [{memberOne: eid}, {$or: [{memberTwo: eid}, {memberThree: eid}]}]});
    res.json(getProject);
});

router.post("/facultysignup", async function(req, res) {

    const ifExistsEmail = await signup.findOne({email: req.body.email});
    const ifExistsFid = await signup.findOne({facultyid: req.body.facultyid});

    if(!ifExistsEmail && !ifExistsFid) {
        console.log("Will Insert in DB");
        const fullname = req.body.fullname;
        const email = req.body.email;
        const password = req.body.password;
        const domainname = req.body.domainname;
        const facultyid = req.body.facultyid;
        const newfacultysignup = new faculty({ fullname,email, password, domainname,facultyid});
    
        try {
            const saveduser = await newfacultysignup.save();
            res.json(saveduser);
        } catch (err) {
            console.error(err);
        }
    }else {
        if(ifExistsEmail) {
            res.send("EMAIL");
        }
        else if(ifExistsFid) {
            res.send("FID");
        }
        
        console.log("Not Inserted In Database");
    }
 
});

router.post("/facultylogin", async function(req, res) {

    const ifExists = await faculty.findOne({$or: [{email: req.body.email}, {facultyid: req.body.email}]});

    if(ifExists) {
        const password = req.body.password;
        if (ifExists.password == password) {
            res.send(ifExists._id);
        }
        else {
            res.send("PASSWORD");
        }
    }else {
        res.send("EMAIL")
        console.log("Not Inserted In Database");
    }
 
});

router.get("/get-faculties", async (req, res) => {
    const ifExists = await faculty.find({domainname: req.query.domain});
    res.json(ifExists);
});

router.get("/get-student-details", async (req, res) => {
    const ifExists = await signup.findOne({enrollmentid: req.query.eid});
    if(ifExists) {
        res.send("TRUE");
    }
    else {
        res.send("FALSE");
    }
});

router.post("/add-project", async(req, res) => {
    const projectname = req.body.projectName;
    const domainname = req.body.domainName;
    const facultyid = req.body.facultyid;
    const teamMemberCount = req.body.teamMemberCount;
    const teamMembers = req.body.teamMembers

    const newproject = new projects({projectName: projectname, domainName: domainname, facultyid: facultyid, teamMemberCount: teamMemberCount, memberOne: teamMembers[0], memberTwo: teamMembers[1], memberThree: teamMembers[2]});
    console.log(newproject);
    const response = await newproject.save();
    res.json(response);
});

router.get("/faculty/projects", async(req, res) => {
    const facultyID = req.query.facultyid;
    const ifExists = await faculty.findOne({_id: facultyID});
    const getID = ifExists.facultyid;
    const getProjects = await projects.find({facultyid: getID});
    res.json(getProjects);
});

router.post("/add-project-commit", async(req, res) => {
    const projectid = req.body.projectid;
    const commitmessage = req.body.commitMessage;
    const projectupdate = req.body.projectUpdate;
    const projectCommit = new commit({projectid: projectid, commitMessage: commitmessage, projectUpdate: projectupdate});
    const response = await projectCommit.save();
    res.json(response);
});

router.get("/get-project-commit", async(req, res) => {
    const projectid = req.query.projectid;
    const ifExists = await commit.find({projectid: projectid});
    res.json(ifExists);
});

module.exports = router;