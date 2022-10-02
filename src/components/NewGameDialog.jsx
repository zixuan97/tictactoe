import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomAlert from './CustomAlert';
import '../styles/common.css';
import { createGameRoom } from '../services/gameService';
import { useNavigate } from 'react-router-dom';

const NewGameDialog = ({ showDialog, setShowDialog, username }) => {
  const [roomName, setRoomName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleChange = (e) => {
    setRoomName(e.target.value);
  };

  const createRoom = () => {
    const firstPlayerUsername = username;
    fetch(createGameRoom(roomName, firstPlayerUsername))
      .then(() => {
        setShowDialog(false);
        navigate(`/ticTacToe/singleGame/${roomName}`);
      })
      .catch(() => {
        setAlertMessage('Unable to create a game now. Contact the admin.');
        setSeverity('error');
      });
  };

  return (
    <div>
      <Dialog open={showDialog} onClose={handleClose}>
        <DialogTitle>Create New Game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome! To create a game room, enter a name for the room.
          </DialogContentText>
          {showAlert && (
            <CustomAlert message={alertMessage} severityOfMessage={severity} />
          )}
          <div className='register-fields'>
            <TextField
              required
              id='outlined-required'
              label='Room Name'
              name='roomName'
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => createRoom()}>Create Room</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewGameDialog;
