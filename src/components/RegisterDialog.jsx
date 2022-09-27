import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { register } from '../services/accountService';

const RegisterDialog = ({showDialog, setShowDialog}) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleClose = () => {
    setShowDialog();
  };

  const handleChange = (e) =>
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });


  const registerUser = () => {
    fetch(register(user))
        .then(() => {
          setShowDialog(false);
        })
        .catch((err) => {
          console.log('error: ', err);
        });
  }


  return (
    <div>
      <Dialog open={showDialog} onClose={handleClose}>
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome to Tic Tac Toe, provide your details and click Register, an account will be created for you.
          </DialogContentText>
          <TextField
              required
              id='outlined-required'
              label='Username'
              name='username'
              onChange={handleChange}
            />
            <TextField
              required
              id='outlined-required'
              label='Password'
              name='password'
              onChange={handleChange}
            />
            <TextField
              required
              id='outlined-required'
              label='First Name'
              name='firstName'
              onChange={handleChange}
            />
            <TextField
              required
              id='outlined-required'
              label='Last Name'
              name='lastName'
              onChange={handleChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => registerUser}>Register</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RegisterDialog;