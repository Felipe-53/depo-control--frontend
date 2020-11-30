import React from 'react';
import Paper from '@material-ui/core/Paper'
import Slide from '@material-ui/core/Slide';
import TopBar from './TopBar/TopBar';
import useStyles from './screenStyles';

const Screen = ({ children, screens, index, screenChangeHandler, screenName, backToMainScreens }) => {
  const classes = useStyles();

  // disable transition for the home screen
  let appear;
  index===0? appear=false : appear=true;

  return (
    <Slide appear={appear} direction="up" timeout={{enter: 200, exit: 200}} in={screens[index]}>
      <Paper className={classes.container} elevation={5}>
        <TopBar 
          index={index}
          screenChangeHandler={screenChangeHandler} 
          screenName={screenName}
          backToMainScreens={backToMainScreens}
        />
        {children}
      </Paper>
    </Slide>
  );
}

export default Screen;
