require('dotenv').config();
const express = require('express');
const app = express();
require('./config/config');
PORT = process.env.PORT || 5000;

app.use(express.json());

const { auth } = require('./middleware/auth');
const { chekrole } = require('./middleware/checkrole');

const { register, logUser, LogoutUser, showUser, deleteUser, deleteByAdmin, profile } = require('./controllers/UserController');
const { players_register } = require('./controllers/PlayersController');

app.post('/admin/show', auth, chekrole, showUser); //show all users only for admin //works
app.post('/admin/delete', auth, chekrole, deleteByAdmin); //deletes selected users only for admin //works

app.post('/register', register); //register for users //works
app.post('/login', logUser);//login //works
app.post('/logoutuser', auth, LogoutUser);//logout for user //works
app.post('/profile', auth, profile)
app.post('/delete', auth, deleteUser);//deletes loged user //works

app.post('/player_register',auth, chekrole, players_register);//registers new players //works

app.listen( PORT, ()=> console.log("el servidor esta en el puerto " + PORT ));