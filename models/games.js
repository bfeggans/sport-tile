var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var gameSchema = new Schema({
    sport: String,
    team1: String,
    team2: String,
    team1Pts: Number,
    team2Pts: Number,
    timeRem: String
});

module.exports = mongoose.model('Game', gameSchema);
