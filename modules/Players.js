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
        type: Number,
        required: true
    },
    mana:{
        type: Number,
        required: true
    },
    strength:{
        type: Number,
        required: true
    },
    power:{
        type: Number,
        required: true
    },
    description:{
        type: String
    },

});
const Players = mongoose.model('Players',PlayersSchema);

module.exports = Players;