require('dotenv').config();
const express = require('express');
const app = express();
require('./config/config');
PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());

const { auth } = require('./middleware/auth');
const { chekrole } = require('./middleware/checkrole');

const { register, logUser, LogoutUser, showUser, deleteUser, deleteByAdmin, profile } = require('./controllers/UserController');
const { registerPlayer, showPlayers, deletePlayer } = require('./controllers/PlayersController');


//USER
app.post('/register', register); //register for user //+
app.post('/login', logUser); //login //+
app.post('/logoutuser', auth, LogoutUser); //logout //+
app.post('/profile', auth, profile); // shows the profile of the acount loged //+
app.post('/delete', auth, deleteUser); //deletes loged user //+
//ADMIN
app.post('/admin/user/show', auth, chekrole, showUser); //show all users, only for admin //+
app.post('/admin/user/delete', auth, chekrole, deleteByAdmin); //deletes selected user, only for admin //+

app.post('/admin/player/register',auth, chekrole, registerPlayer); //registers new player, only for admin //+
app.post('/admin/player/show',auth, chekrole, showPlayers); //show all players, only for admin //+
app.post('/admin/player/delete',auth, chekrole, deletePlayer); //deletes selected player, only for admin //+

app.listen( PORT, ()=> console.log("el servidor esta en el puerto " + PORT ));