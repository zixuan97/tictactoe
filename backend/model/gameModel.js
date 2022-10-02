const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    roomName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    firstPlayerUsername: {
      type: String,
      required: true,
    },
    secondPlayerUsername: {
      type: String,
    },
    isActive: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

const GameModel = mongoose.model('Game', gameSchema);

module.exports = GameModel;
