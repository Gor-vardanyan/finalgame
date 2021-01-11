require('dotenv').config();
const express = require('express');
var cors = require('cors')

const app = express();
require('./config/config');
PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());

const { auth } = require('./middleware/auth');
const { chekrole } = require('./middleware/checkrole');

const { register, logUser, LogoutUser, showUser, deleteUser, deleteByAdmin, profile, creditController, buyplayer } = require('./controllers/UserController');
const { registerPlayer, showPlayers, deletePlayer, showPlayersUser } = require('./controllers/PlayersController');


app.post('/admin/player/show', showPlayers); // show all players //+

//USER
app.post('/register', register); //register for user //+
app.post('/login', logUser); //login //+
app.post('/logoutuser', auth, LogoutUser); //logout //+
app.post('/profile', auth, profile); // shows the profile of the acount loged //+
app.post('/delete', auth, deleteUser); //deletes loged user //+
app.post('/player/show', auth, showPlayersUser); //show all players, the user has //+
app.post('/victory', auth, creditController); //controlls credits of user //+
app.post('/buy/player', auth, buyplayer); //action of buying new player for user //+

//ADMIN
app.post('/admin/user/show', auth, chekrole, showUser); //show all users, only for admin //+
app.post('/admin/user/delete', auth, chekrole, deleteByAdmin); //deletes selected user, only for admin //+

app.post('/admin/player/register', auth, chekrole, registerPlayer); //registers new player, only for admin //+
app.post('/admin/player/show', auth, chekrole, showPlayers); //show all players, only for admin //+
app.post('/admin/player/delete', auth, chekrole, deletePlayer); //deletes selected player, only for admin //+

app.listen( PORT, ()=> console.log("el servidor esta en el puerto " + PORT ));