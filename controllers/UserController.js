const UserModel = require('../modules/User')
const bcrypt = require("bcryptjs");
//const jwt = require('jsonwebtoken');

const register = async (req, res) => {
        let bodyData = req.body;
        console.log(req.body)
        let hashed_password = await bcrypt.hash(bodyData.password, 10);
        try {
            const User = await new UserModel({
                nickname: bodyData.nickname,
                email: bodyData.email,
                password: hashed_password,
                credit: bodyData.credit,
                players: bodyData.players
            }).save();
    
            res.send({
                message: "Account created successfully.", ...User
            })
        } catch (err) {
                if (err.code === 11000) { // E11000 duplicate key error (unique true)
                    res.status(409); // conflict
                    console.log(err)
                    res.send({
                        error: "Email already used."
                    });
        
                } else {
                    res.send(err);	
                };
            };
        };

module.exports = {
    register
};