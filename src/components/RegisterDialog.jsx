import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { register } from '../services/accountService';
import CustomAlert from './CustomAlert';
import '../styles/common.css'

const RegisterDialog = ({ showDialog, setShowDialog }) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleClose = () => {
    setShowDialog(false);
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
      .catch(() => {
        setAlertMessage('Unable to create an account now. Contact the admin.');
        setSeverity('error');
        setShowAlert(true);
      });
  };

  return (
    <div>
      <Dialog open={showDialog} onClose={handleClose}>
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome to Tic Tac Toe, provide your details and click Register. An
            account will be created for you.
          </DialogContentText>
          {showAlert && (
            <CustomAlert message={alertMessage} severityOfMessage={severity} />
          )}
          <div className='register-fields'>
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
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => registerUser()}>Register</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RegisterDialog;
