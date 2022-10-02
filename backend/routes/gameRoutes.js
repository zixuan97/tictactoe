const router = require('express').Router();
let Game = require('../model/GameModel');

//Find all games
router.route('/').get((req, res) => {
  Game.find()
    .then((games) => res.json(games))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/allGames/:firstPlayerUsername').get(async (req, res) => {
  const { firstPlayerUsername } = req.params;
  console.log(firstPlayerUsername);
  Game.find({"firstPlayerUsername": {$ne: firstPlayerUsername}})
    .then((games) => res.json(games))
    .catch((err) => res.status(400).json('Error: ' + err));
});


//Create a game, supply roomName and first player's username
router.route('/create').post((req, res) => {
  const { roomName, firstPlayerUsername } = req.body;
  const newGame = new Game({ roomName, firstPlayerUsername, isActive: true });
  newGame
    .save()
    .then(() => res.json('Game created!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//join room based on roomName
router.route('/join').post(async (req, res) => {
  const { roomName, secondPlayerUsername } = req.body;
  const joiningGame = await Game.findOne({ roomName: roomName }).exec();

  if (joiningGame) {
    const updatedGame = Game.findOneAndUpdate(
      { roomName: roomName },
      { set: { secondPlayerUsername: secondPlayerUsername } }
    ).exec();
    if (updatedGame) {
      res.status(200).json({ message: 'second player joined', updatedGame: updatedGame });
    }
    else {
      res.status(500).json({ message: 'failed to join game' });
    }
  } else {
    res.status(401).json('no game found');
  }
});

module.exports = router;
