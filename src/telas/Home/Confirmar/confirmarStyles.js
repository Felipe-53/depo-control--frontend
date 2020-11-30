import { makeStyles } from '@material-ui/core/styles';

/* css vars defined in App.css. The height
of the container is calculated so that
only the list container is scrollable. */
const ROLE = localStorage.getItem('role');
const adminHeight = 'calc(100% - (var(--top-bar-height) + var(--home-btn-height) + var(--admin-btn-height)) )';
const funcioHeight = 'calc(100% - ( var(--top-bar-height) + var(--home-btn-height)))';

const useStyles = makeStyles({

  listContainer: {
    width: '100%',
    height: ROLE === 'admin'? adminHeight : funcioHeight,
    overflowY: 'scroll',
    textAlign: 'center', /* Align title inside container */
  },

  title: {
    margin: '1rem 0',
  },

  Fab: {
    /* It's being positioned relative to the CONTAINING BLOCK
    [in our case, the App component that has `trnasform: translate(0,0)`] */
    position: 'fixed',
    bottom: ROLE === 'admin'? 'calc(var(--admin-btn-height) + 3.5%)' : '3.5%',
    right: '5%',
  },
  
});

export default useStyles;