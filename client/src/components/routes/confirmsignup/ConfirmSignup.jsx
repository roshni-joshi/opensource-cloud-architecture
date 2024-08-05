import React, { useState } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Container, Grid, Typography, TextField, Button } from '@material-ui/core';
import history from "../../../history";
import UserPool from '../helper/UserPool';

function ConfirmSignup() {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (event) => {
    const cognitoUser = new CognitoUser({
      Username: sessionStorage.getItem("email"),
      Pool: UserPool,
    });
    event.preventDefault();
    cognitoUser.confirmRegistration(confirmationCode, true, (error, data) => {
      if (error) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
        history.push('/signin');
      }
    });
  };

  return (
    <Container maxWidth="xs" style={{ paddingBottom: '10%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Enter the confirmation code sent to your email.</Typography>
        </Grid>
        {showAlert && (
          <Grid item xs={12}>
            <div>Confirmation code is invalid. Try Again!</div>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="confirmationCode"
            label="Confirmation Code"
            variant="outlined"
            onChange={(event) => setConfirmationCode(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ConfirmSignup;
