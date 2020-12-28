const UserModel = require('../modules/User')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const showUser = async (req, res) => {
    try {
        const alldates = await UserModel.find({});
        res.send(alldates)
} catch (error) {console.log(error)}
};

const profile = async (req, res) => {
    let nickname = req.user_nickname;
    try {
        const dates = await UserModel.findOne({nickname});
        res.send(dates)
} catch (error) {console.log(error)}
};

const register = async (req, res) => {
    let bodyData = req.body;
    console.log(req.body)
    let hashed_password = await bcrypt.hash(bodyData.password, 10);
    try {
        const User = await new UserModel({
            nickname: bodyData.nickname,
            email: bodyData.email,
            password: hashed_password
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
                let token = jwt.sign(user.email, process.env.jwt_encoder); // firma el email y genera el token con el texto del env
                user.token = token; // pasa la firma del email al campo token
                await UserModel.findOneAndUpdate(query,{ token }); // sobreescribe y guarda el token en la coleccion user
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

};

const LogoutUser = async (req, res) =>{
    let nickname = req.user_nickname;
    await UserModel.findOneAndUpdate({nickname},{token:null});
    res.send('Logged out');
};

const deleteUser = async (req, res) => {
    let nickname = req.user_nickname;

    await UserModel.findOneAndDelete({ nickname })
    .then (deleted => {
		
		if (deleted) {
			res.send({
				message: `User with nickname ${deleted.nickname} and email: ${deleted.email} deleted`
			});
		} else {
			res.status(404);
			res.send({
				error: `Didn't find client with nickname ${nickname}.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
};

const deleteByAdmin = async (req, res) => {
    let selectdeleted = req.body.nickname;
    //console.log(req.body.nickname);

    await UserModel.findOneAndDelete({ nickname:selectdeleted })
    .then (deleted => {
		
		if (deleted) {
			res.send({
				message: `User with nickname ${deleted.nickname} and email: ${deleted.email} deleted`
			});
		} else {
			res.status(404);
			res.send({
				error: `Didn't find client with nickname ${selectdeleted}.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
};

module.exports = {
    showUser,
    profile,
    register,
    logUser,
    LogoutUser,
    deleteUser,
    deleteByAdmin
};