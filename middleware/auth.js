const jwt = require('jsonwebtoken');
const UserModel = require('../modules/User');

function auth(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] //this is done because the headers come as 2nd argument
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, process.env.jwt_encoder, async (err, token) => {
    if (err) return res.sendStatus(403)

    console.log(`token es : ${token}`);
    let user = await UserModel.findOne({email:token});
    if(user === null || user.token === null){
      res.send('El Token no es valido');
    }else{
      req.user_nickname = user.nickname; // We define user_nickname's content nesting it into req
      next()
    }
  })
}

module.exports = {auth}