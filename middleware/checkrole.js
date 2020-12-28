const UserModel = require('../modules/User');

const chekrole = async (req, res, next) =>{
const nickname = req.user_nickname
let user = await UserModel.findOne({nickname:nickname});
    if(user.role === 1){
    req.user_role = user.role; 
    next()
    
    }else{
    return res.send('El Token no es valido');
    };
}
module.exports = {chekrole}