import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';

function ConfirmSignup() {
  const [confirmationCode, setConfirmationCode] = useState();
  const [showAlert, setShowAlert] = useState(false)
  const location = useLocation();
  const { cognitoUser } = location.state || {};

  const handleSubmit = () => {
    cognitoUser.confirmRegistration(confirmationCode, true, (error, data) => {
      if (error) {
        setShowAlert(true)
      } else {
        setShowAlert(false)
        history.push("/signin");
      }
    })
  }

  return (
    <Container maxWidth="xs" sx={{ paddingBottom: '10%' }}>
      <Grid container rowGap={3} columnSpacing={2}>
        <Grid item md={12}>
          <Typography>Enter the confirmation code sent to your email.</Typography>
        </Grid>
        {showAlert &&
          <Grid item md={12}>
            <Alert severity="error">Confirmation code is invalid. Try Again!</Alert>
          </Grid>
        }
        <Grid item md={12}>
          <TextField
            fullWidth
            id="Enter Confirmation Code"
            label="confirmationCode"
            variant="outlined"
            onChange={(event) => setConfirmationCode(event.target.value)} />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" variant="contained" onClick={handleSubmit}>Next</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ConfirmSignup
