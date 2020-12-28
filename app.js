require('dotenv').config();
const express = require('express');
const app = express();
require('./config/config');
PORT = process.env.PORT || 5000;

app.use(express.json());

const { register, logUser } = require('./controllers/UserController');
const { players_register } = require('./controllers/PlayersController');

app.post('/register',register);
app.post('/login',logUser);

app.post('/player_register',players_register);

app.listen( PORT, ()=> console.log("el servidor esta en el puerto " + PORT ));