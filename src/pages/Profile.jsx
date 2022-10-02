import React, { useEffect, useState } from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import { getUser } from '../services/accountService';
import { Paper, Grid, Typography } from '@mui/material';
import CustomAlert from '../components/CustomAlert';
import '../styles/common.css'

const Profile = (props) => {
  const [user, setUser] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    const username = props.username;
    if (username) {
      getUser(username)
        .then((data) => {
          console.log('user', data.user);
          setUser(data.user);
        })
        .catch((err) => {
          setAlertMessage('Unable to login now. Contact the admin.');
          setSeverity('error');
          setShowAlert(true);
        });
    }
  }, []);

  return (
    <>
      {user && (
        <Paper elevation={1}>
          <Grid container spacing={2} style={{margin: '1%', padding: '1%'}}>
            <Grid item xs={12}>
              {showAlert && (
                <CustomAlert
                  message={alertMessage}
                  severityOfMessage={severity}
                />
              )}
              <div>
                <h4>Username</h4>
                <Typography>{user?.username}</Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <h4>Name</h4>
                <Typography>{user.firstName + ' ' + user.lastName}</Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default Profile;
