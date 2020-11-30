import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from '../authStyles';
import Feedback from '../../components/Feedback/Feedback';
import submitCredentials from './submitCredentials';

export default function Login({ redirectToApp, redirectToDeposito}) {
  const classes = useStyles();

  const [login, set_login] = useState('');
  const [password, set_password] = useState('');
  const [submitFeedback, set_submitFeedback] = useState(null);

  const authenticate = async (event) => {
    event.preventDefault();

    let data = {
      login: login,
      password: password,
    }

    try {
      let response = await submitCredentials('/api/login', data);
      const jwt = response['jwt'];
      const role = response['role']
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('role', role);

      if (role === 'admin') {
        redirectToApp();
        window.location.reload();
      }
      else if (role === 'funcio') {
        redirectToDeposito();
      }

    } catch (err) {
      set_submitFeedback(
        <Feedback type="error" message={err.message} closeHandler={set_submitFeedback} />
      );
    }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={login}
            onChange={event => set_login(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={event => set_password(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          {submitFeedback}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={authenticate}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
