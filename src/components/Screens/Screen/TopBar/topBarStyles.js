import { makeStyles } from '@material-ui/core/styles';

/* --top-bar-height is defined in App.css file
and was set like that so that the height of the
remaining of the screen could be calculated. */

const useStyles = makeStyles({
  appBar: {
    height: 'var(--top-bar-height)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconButton: {
    position: 'absolute',
    left: '0',
  },

  icon: {
    fontSize: '2.3rem',
    color: 'white',
  },

  title: {
    fontSize: '1.7rem',
  }

});

export default useStyles;

