const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsersSchema = new Schema({
    UserID: ObjectId,
    nickname: {
        type: String,
        unique: true,
        required: true
    },
    email: { 
        type: String,
        unique: true,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        default: 0
    },
    credit: {
        type: Number,
        required: true,
        default: 15
    },
    players: {
        type: Array,
        required: true,
        default: ["Ryu"]
    },    
    token:{
        type: String
    },
});
const User = mongoose.model('User',UsersSchema);

module.exports = User;