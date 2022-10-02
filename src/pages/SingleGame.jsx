import React, { useEffect, useState } from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import io from 'socket.io-client';
import '../styles/common.css';
import Square from '../components/Square';

const ENDPOINT = 'http://localhost:5000';
var socket;
const SingleGame = (props) => {
  const username = localStorage.getItem('loggedInUser');
  const [socketConnected, setSocketconnected] = useState();
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [player, setPlayer] = useState('O');

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', username);
    socket.on('connection', () => setSocketconnected(true));
    joinRoom(username);
  }, []);

  const joinRoom = (username) => {
    socket.emit('join_room', username);
  };

  useEffect(() => {
    if (player == 'X') {
      setPlayer('O');
    } else {
      setPlayer('X');
    }
  }, [board]);

  const chooseSquare = (square) => {
    setBoard(
      board.map((val, idx) => {
        if (idx === square && val === '') {
          return player;
        }
        return val;
      })
    );
  };

  return (
    <>
      <div className='game-board'>
        <div className='game-row'>
          <Square
            val={board[0]}
            chooseSquare={() => {
              chooseSquare(0);
            }}
          />
          <Square
            val={board[1]}
            chooseSquare={() => {
              chooseSquare(1);
            }}
          />
          <Square
            val={board[2]}
            chooseSquare={() => {
              chooseSquare(2);
            }}
          />
        </div>
        <div className='game-row'>
          <Square
            val={board[3]}
            chooseSquare={() => {
              chooseSquare(3);
            }}
          />
          <Square
            val={board[4]}
            chooseSquare={() => {
              chooseSquare(4);
            }}
          />
          <Square
            val={board[5]}
            chooseSquare={() => {
              chooseSquare(5);
            }}
          />
        </div>
        <div className='game-row'>
          <Square
            val={board[6]}
            chooseSquare={() => {
              chooseSquare(6);
            }}
          />
          <Square
            val={board[7]}
            chooseSquare={() => {
              chooseSquare(7);
            }}
          />
          <Square
            val={board[8]}
            chooseSquare={() => {
              chooseSquare(8);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SingleGame;
