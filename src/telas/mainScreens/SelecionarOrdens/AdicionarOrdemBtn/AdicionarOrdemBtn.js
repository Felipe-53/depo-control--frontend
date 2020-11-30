import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  addButton: {
    /* The App div has a `transform: translate(0, 0);` property
    so that it becomes the CONTAINING BLOCK for this button. */
    position: 'fixed',
    bottom: '20px',
    right: '20px',

    /* the `size="large" prop is not big enough for me so setting
    it manually */
    width: '4.2rem',
    height: '4.2rem',
  },

  addIcon: {
    fontSize: '4.2rem',
    color: 'white',
  }
});

const AdicionarOrdemBtn = ({ set_openModal }) => {
  const classes = useStyles();

  return (
    <Fab
      onClick={() => set_openModal(true)}
      color="primary"
      className={classes.addButton}
    >
      <AddIcon className={classes.addIcon} />
    </Fab>
  );
}

export default AdicionarOrdemBtn;
