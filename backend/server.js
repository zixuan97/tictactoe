const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const userRouter = require('./routes/userRoutes');
const gameRouter = require('./routes/gameRoutes')

app.use('/users', userRouter);
app.use('/games', gameRouter);

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const io = require('socket.io')(server, {
  //Waits 1min til timeout
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000'
  }
});

io.on('connection', (socket) => {
  console.log('connected to socket.io');

  socket.on('setup', (username) => {
    socket.join(username);
    socket.emit('connected');
  });

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log('User Joined Room: ' + room)
    socket.emit('connected');
  });
});
