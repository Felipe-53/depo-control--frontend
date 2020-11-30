import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

  container: {
    width: '100%',
    height: 'calc(100% - var(--top-bar-height))',

    /* I created this container just to write this next line */
    overflow: 'scroll',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },

  enviarBtn: {
    marginTop: '10%',
    marginBottom: '10%',
  }

}));

export default useStyles;
