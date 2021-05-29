const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("Server Started at port 5000");
});

mongoose.connect("mongodb+srv://Numair07:Shagufta1973@signup-cluster.m4tlm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("Successful connection to MongoDB server.");
    } else {
        console.log("Database Connection Failed");
    }
});

app.use("/app", require("./routes/routes"));