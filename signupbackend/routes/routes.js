const express = require("express");
const router = express.Router();

const signup = require("../models/signupModels");

router.post("/signup", async function(req, res) {

    const ifExistsUsername = await signup.findOne({username: req.body.username});
    const ifExistsEmail = await signup.findOne({email: req.body.email});


    if(!ifExistsUsername && !ifExistsEmail) {
        console.log("Will Insert in DB");
        const fullname = req.body.fullname;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const date = new Date();
        const newsignup = new signup({ fullname, username, email, password, date });
    
        console.log(newsignup);
    
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
        
        console.log("Not Inserted In Database");
    }

    
});


module.exports = router;