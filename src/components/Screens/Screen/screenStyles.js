import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    /* POSITION AND DIMENSIONS */
    
    /* Absolute positioning serves the porpuse
    of removing the element from the normal flow
    of the document so that multiple screens stack
    on top (z direction) of each other instead of
    in the same "page" */
    position: 'absolute', 
    height: '100%',
    width: '100%',
  
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    backgroundColor: 'white',

  }
});

export default useStyles;