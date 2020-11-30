import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

  // css variables defined in App.css
  btnContainer: {
    height: 'var(--home-btn-height)',
    width: '100%',
    padding: 0,
  },

  navBtn: {
    height: '100%',
    width: '50%',
    borderRadius: 0,
  },

  adminBtn: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: 'var(--admin-btn-height)',

    borderRadius: 0,
  },

  badge: {
    '& span': {
      zIndex: 'auto',
    } 
  },
  
});

export default useStyles;
