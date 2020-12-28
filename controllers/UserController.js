const UserModel = require('../modules/User')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

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
const logUser = async (req, res) => {
    let query = {nickname: req.body.nickname}
    let user = await UserModel.findOne(query);
    console.log(req.body)
    if(!user){
        res.status(500).send({
            message: "No existe el usuario"
        });
    }else{
        let passwordOk = await bcrypt.compare(req.body.password, user.password);
        if(passwordOk){
            if(!user.token){ // si no existe el campo token (o esta vacio) se asignará
                let token = jwt.sign(user.email, process.env.jwt_encoder); // firma el dni y genera el token con el texto del env
                user.token = token; // pasa la firma del dni al campo token
                await UserModel.findOneAndUpdate(query,{ token }); // guarda el token en la coleccion user
            }
            
            res.send({
                user
            })
        }else{
            res.send({
                message: "Credenciales incorrectas"
            })
        }
        
    }

}
module.exports = {
    register,
    logUser
};