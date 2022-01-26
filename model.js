const mongoose = require("mongoose");


const PosSchema = new mongoose.Schema({
    x: Number,
    y: Number
});

module.exports = mongoose.model("Pos", PosSchema);