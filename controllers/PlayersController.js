const PlayersModel = require('../modules/Players');
const UserModel = require('../modules/User');

const registerPlayer = async (req, res) => {
    let bodyData = req.body;
    console.log(req.body)
    try {
        const Player = await new PlayersModel({
            name: bodyData.name,   
            value: bodyData.value,
            health: bodyData.health,
            mana: bodyData.mana,
            strength: bodyData.strength,
            power: bodyData.power,
            description: bodyData.description

        }).save();

        res.send({
            message: "Player added successfully.", ...Player
        })
    } catch (err) {
        if (err.code === 11000) { // E11000 duplicate key error (unique true)
            res.status(409); // conflict
            console.log(err)
            res.send({
                error: "Player already exist."
            });

        } else {
            res.send(err);	
        };
    };
};

const showPlayers = async (req, res) => {
    try {
        const alldates = await PlayersModel.find({});
        res.send(alldates)
} catch (error) {console.log(error)}
};
const showPlayersUser = async (req, res) => {
    try {
        let nickname = req.user_nickname;
        const player_user = await UserModel.find({nickname});
        console.log(player_user)
        const all = player_user.players;
        let play = []
        all.forEach(element => { play.push( await PlayersModel.find({name:element}));}); 
        res.send(play)
} catch (error) {console.log(error)}
};

const deletePlayer = async (req, res) => {
    let selectdeleted = req.body.name;

    await PlayersModel.findOneAndDelete({ name: selectdeleted })
    .then (deleted => {
		
		if (deleted) {
			res.send({
				message: `Player with name ${deleted.name} deleted`
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
    showPlayersUser,
    showPlayers,
    deletePlayer,
    registerPlayer
};