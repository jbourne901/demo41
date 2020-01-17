const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    name: String
});

const GameModel = mongoose.model("game", GameSchema);

module.exports = GameModel;