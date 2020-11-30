import { makeStyles } from '@material-ui/core/styles';

const zIndex = 10000;

const useStyles = makeStyles(theme => ({
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: zIndex,
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

  mercadoriaLabel: {
    marginTop: '10%',
    marginBottom: '2%',
  },

  quantidadeLabel: {
    marginBottom: '2%',
  },

  autoComplete: {
    marginBottom: '10%',
    width: '80%',
    '& input': {
      fontSize:'1.5rem',
      color: 'transparent',
      textAlign: 'center !important',
      textShadow: `0px 0px 0px ${theme.palette.primary.main}`,
    }
  },

  qtd: {
    width: '35%',
    '& input': {
      fontSize: '2rem',
      fontWheight: '500',
      textAlign: 'center !important',
      color: 'transparent',
      textShadow: `0px 0px 0px ${theme.palette.primary.main}`,
    },
  },

  confirmBtn: {
    marginTop: '15%',
  },
  
  
}));


export default useStyles;
