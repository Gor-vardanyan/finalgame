const PlayersModel = require('../modules/Players')

const players_register = async (req, res) => {
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
                message: "Player aded successfully.", ...Player
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

module.exports = {
    players_register
};