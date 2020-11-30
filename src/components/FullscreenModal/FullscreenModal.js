import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import useStyles from './styles.js';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function Modal({ appBarTitle, closeModalHandler, visible, children }) {

  const classes = useStyles();

  /* There are two ways for handling the visibility of the modal
  to the user. The difference between them is that one completly
  gets rid of the modal and the other has the modal laying around
  but translated out of sight.
  In the first one you conditionally render the modal by either
  rendering or setting it to null.
  In the second one you always render it and control its visibility
  with the `visible` props. */
  let showModal;
  if (visible === undefined) {
    showModal = true;
  } else {
    showModal = visible;
  }

  return (
    <Slide direction='down' in={showModal}>
      <Box className={classes.modalContainer}>

        <AppBar position="sticky" className={classes.appBar}>
          <IconButton onClick={closeModalHandler} className={classes.iconButton}>
            <CloseIcon className={classes.icon} />
          </IconButton>

          <Typography className={classes.title} >
            {appBarTitle}
          </Typography>
        </AppBar>

        {children}

      </Box>
    </Slide>
  );

}

