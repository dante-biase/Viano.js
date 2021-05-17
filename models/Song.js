const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const songSchema = new mongoose.Schema({
    "name": {type: String, required: true},
    "artist": {type: String, required: true},
    "difficulty": {type: String, required: true},
    "key_sheet": {type: String, required: true},
    "duration": {type: String, required: true},
    "tempo": {type: Number, required: true},
    "transposition": {type: Number, required: true},
});


const Song = mongoose.model('Song', songSchema);

module.exports = {Song};
