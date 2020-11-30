import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useStyles from './topBarStyles';

const TopBar = ({ screenChangeHandler, index, screenName, backToMainScreens }) => {
  const classes = useStyles();

  const prevScreenHandler = () => {
    screenChangeHandler('prev');
    if (screenName === 'Admin') {
      setTimeout(backToMainScreens, 200);
    }
  }

  let prevScreenIcon = (
    <IconButton className={classes.iconButton} onClick={prevScreenHandler}>
      <ArrowBackIcon className={classes.icon} />
    </IconButton>
  );

  function defineTitle () {
    let deposito = localStorage.getItem('deposito');

    if (deposito) {
      return JSON.parse(deposito)['nome'];
    }

    return screenName;
  }

  return (
    <AppBar
      className={classes.appBar}
      elevation={2}
      position="static"
    >
      {index === 0? null : prevScreenIcon}

      <Typography className={classes.title}>
        {defineTitle()}
      </Typography>
    </AppBar>
  );
}

export default TopBar;
