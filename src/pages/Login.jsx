import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormGroup,
  FormControl,
  TextField,
  InputLabel,
  OutlinedInput,
  Button
} from '@mui/material';
import { login } from '../services/accountService';
import RegisterDialog from '../components/RegisterDialog';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

  const handleLogin = (e) => {
    console.log('hit');
    e.preventDefault();
    const { username, password } = user;
    if (username === '' || password === '') {
      // TODO: handle error case
    } else {
      fetch(login(user))
        .then(() => {
          localStorage.setItem('loggedInUser', username)
          navigate(`/ticTacToe/games`);
        })
        .catch((err) => {
          console.log('error: ', err);
        });
    }
  };

  return (
    <>
      <RegisterDialog
        showDialog={showDialog}
        setShowDialog={() => setShowDialog(false)}
      />

      <div className='login'>
        <Box className='login-box'>
          <form onSubmit={handleLogin} className='login-container'>
            <FormGroup>
              <h1>Login to Tic Tac Toe</h1>
              <TextField
                required
                id='outlined-required'
                label='Username'
                name='username'
                onChange={handleChange}
              />
              <FormControl variant='outlined' style={{ margin: '2vh 0' }}>
                <InputLabel required htmlFor='outlined-adornment-password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  required
                  id='outlined-adornment-password'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  label='Password'
                />
              </FormControl>

              <div style={{ marginTop: '2vh' }}>
                <Button
                  type='submit'
                  variant='contained'
                  className='login-btn'
                  color='primary'
                >
                  Login
                </Button>
                <Button
                  variant='contained'
                  className='login-btn'
                  color='primary'
                  onClick={() => {
                    setShowDialog(true);
                  }}
                >
                  Register
                </Button>
              </div>
            </FormGroup>
          </form>
        </Box>
      </div>
    </>
  );
};

export default Login;
