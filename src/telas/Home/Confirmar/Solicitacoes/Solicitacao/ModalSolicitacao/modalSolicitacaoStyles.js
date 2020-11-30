import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

  movLabel: {
    margin: '4% 0 1% 0',
  },


  list: {
    width: '100%'
  },

  quem: {
    fontWeight: 400,
    margin: '5% 0 8% 0'
  },

  btnContainer: {
    margin: '4rem 0 2.5rem 0',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  despacharBtn: {
    width: '50%',
    marginBottom: '3rem',
  },

  checkbox: {
    marginBottom: '1.5rem',
    width: '90%',
    justifyContent: 'center',
  }
  
});


export default useStyles;
