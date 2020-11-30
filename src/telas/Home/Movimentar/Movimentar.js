import React, { useContext } from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ServerDataManager } from '../../Telas';

const useStyles = makeStyles({

  movBtnsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 'calc(100% - (var(--top-bar-height) + var(--admin-btn-height) + var(--home-btn-height)))',
  },

  movBtns: {
    height: '5rem',
    width: '80%',
 },

});

function Movimentar({ activeContainer, screenChangeHandler }) {

  const set_tipo_mov = useContext(ServerDataManager)['set_tipo_mov'];
  const classes = useStyles();
  
  // click handler
  const selectTipoMov = (tipo) => {
    set_tipo_mov(tipo);
    screenChangeHandler('next');
  }


  return activeContainer === 'movimentar'? (
    <div className={classes.movBtnsContainer}>
      <Button
        onClick={() => selectTipoMov('saida')}
        className={classes.movBtns}
        variant="outlined"
        color="secondary">
        Saída
      </Button>

      <Button
        onClick={() => selectTipoMov('entrada')}
        className={classes.movBtns}
        variant="outlined"
        color="primary">
        Entrada
      </Button>

    </div>
  ) :
  null;
}

export default Movimentar
