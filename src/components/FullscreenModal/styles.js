import { makeStyles } from '@material-ui/core/styles';

const zIndex = 10000;

const useStyles = makeStyles({
    
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: zIndex,
    overflowY: 'scroll',
  },

  /* APPBAR STYLES */

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
  },

  /* END APPBAR STYLES */

});


export default useStyles;
