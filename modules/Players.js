const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PlayersSchema = new Schema({
    PlayerID: ObjectId,
    name: {
        type: String,
        required: true
    },    
    value: {
        type: Number,
        required: true
    },
    health:{
        type: String,
        required: true
    },
    mana:{
        type: String,
        required: true
    },
    strength:{
        type: String,
        required: true
    },
    power:{
        type: String,
        required: true
    },
    description:{
        type: String
    },

});
const Players = mongoose.model('Players',PlayersSchema);

module.exports = Players;