import React, { useEffect, useState } from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import NewGameDialog from '../components/NewGameDialog';
import { getAllGames, joinGameRoom } from '../services/gameService';
import CustomAlert from '../components/CustomAlert';
import { useNavigate } from 'react-router-dom';

const Games = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [games, setGames] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const firstPlayerUsername = props.username;
    if (firstPlayerUsername) {
      getAllGames(firstPlayerUsername)
        .then((data) => {
          setGames(data);
        })
        .catch((err) => {
          setAlertMessage('Unable to get all games. Contact the admin.');
          setSeverity('error');
          setShowAlert(true);
        });
    }
  }, [props.username]);

  const joinRoom = (roomName) => {
    const secondPlayerUsername = props.username;
    if (secondPlayerUsername) {
      joinGameRoom(roomName, secondPlayerUsername)
        .then(() => {
          navigate(`/ticTacToe/singleGame/${roomName}`);
        })
        .catch((err) => {
          console.log(err);
          setAlertMessage('Unable to join room. Contact the admin.');
          setSeverity('error');
          setShowAlert(true);
        });
    }
  };

  return (
    <>
      <NewGameDialog
        showDialog={showDialog}
        setShowDialog={() => setShowDialog(false)}
        username={props.username}
      />

      <Button
        variant='contained'
        className='create-game-btn'
        color='primary'
        onClick={() => {
          setShowDialog(true);
        }}
      >
        Create New Game
      </Button>
      {showAlert && (
        <CustomAlert message={alertMessage} severityOfMessage={severity} />
      )}
      {games.map((game) => {
        return (
          <Card sx={{ minWidth: 275 }} key={game} className='game-card'>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                Room Name
              </Typography>
              <Typography variant='h5' component='div'>
                {game.roomName}
              </Typography>
            </CardContent>
            <CardActions>
              {game.isActive && (
                <Button size='small' onClick={() => joinRoom(game.roomName)}>
                  Join Game
                </Button>
              )}
            </CardActions>
          </Card>
        );
      })}
    </>
  );
};

export default Games;
