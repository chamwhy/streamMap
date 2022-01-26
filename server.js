require('dotenv').config();


const express = require("express");
const cors = require("cors");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const Pos = require("./model");
const bodyParser = require("body-parser");
mongoose
  .connect(`mongodb+srv://chamwhy:${process.env.PASSWORD}@cluster0.zqsxj.mongodb.net/test`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

const port = process.env.PORT | 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));


app.get("/", (req, res) => {
    console.log("get/");
    Pos.find((err, poses) => {
        if(err) console.log(err);
        const sendData = [];
        poses.forEach(pos => {
            sendData.push([pos.x, pos.y]);
        });
        res.render("index", {
            poses: sendData
        });
    });
});

app.post("/pos", (req, res) => {
    console.log("pos post", req.body);
    const position = req.body;
    const positionModel = new Pos({
        x: position.x,
        y: position.y
    });
    positionModel.save().then(()=>{
        res.status(200);
    });
    
});

app.listen(port, ()=>{
    console.log(`server is opened at ${port}`);
});
