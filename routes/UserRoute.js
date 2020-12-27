const route = require('express'); 
const UserController = require('../controllers/UserController');
const { register } = require('../controllers/UserController');

const reg = route.post('/register',UserController,register);

module.exports ={
    reg
}