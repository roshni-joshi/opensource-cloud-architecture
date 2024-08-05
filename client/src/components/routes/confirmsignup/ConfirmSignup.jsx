import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button, Alert } from '@material-ui/core';
import history from "../history";

function ConfirmSignup() {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  const { cognitoUser } = location.state || {};

  const handleSubmit = (event) => {
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
            <Alert severity="error">Confirmation code is invalid. Try Again!</Alert>
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
