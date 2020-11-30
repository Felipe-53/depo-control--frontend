import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import DropdownMenu from '../../../../components/DropdownMenu/DropdownMenu';
import { makeStyles } from '@material-ui/core/styles';
import Feedback from '../../../../components/Feedback/Feedback';

const useStyles = makeStyles (theme => ({
  quantidade: {
    '& input': {
      fontSize: '1.3rem',
      fontWheight: '500',
      textAlign: 'center !important',
      color: 'transparent',
      textShadow: `0px 0px 0px ${theme.palette.primary.main}`,
    },
  },

  formControl: {
    width: '70%',
    marginBottom: '50px',
  }
}));

const AdicionarOrdem = ({mercadoriasOptions, ordens, set_ordens, set_warnDuplicateMercadoria}) => {

  const classes = useStyles();

  const [mercadoria, set_mercadoria] = useState('');
  const [quantidade, set_quantidade] = useState('');
  const [idManager, set_idManager] = useState(0);


  function adicionarOrdem () {

    /* Verificar se a mercadoria selecionada já consta entre as ordens */
    for (let i=0; i<ordens.length; i++) {
      if (ordens[i].mercadoria_id === mercadoria.id) {
        set_warnDuplicateMercadoria(
          <Feedback
            type="error"
            message="A mercadoria selecionada já consta entre as ordens"
            closeHandler={set_warnDuplicateMercadoria}
          />
        );

        /* Reset values */
        set_mercadoria(null);
        set_quantidade('');
        /* Stop the execution of the funcion */
        return
      }
    }

    let newOrdem = {
      id: idManager, // only relevant in the client side; read more in the state definition.
      
      /* The following two are the only server-side relevant */
      qtd: quantidade,
      mercadoria_id: mercadoria['id'],
      
      /* These are display only (just for the end-user) */
      nomeMercadoria: mercadoria['nome'],
      unidade: mercadoria['unidade'],
    }

    set_ordens(prevOrdens => {
      return [...prevOrdens, newOrdem];
    });
    set_idManager(idAnterior => {
      return idAnterior + 1;
    });

    /* Reset valus */
    set_mercadoria('');
    set_quantidade(''); // nothing for an input element is an empty string
  }

  return (
    <>
      <Typography variant="h6" color="primary" style={{margin: '20px 0 30px 0'}}>
        Ordem
      </Typography>

      <DropdownMenu
        label="Mercadoria"
        value={mercadoria}
        set_value={set_mercadoria}
        options={mercadoriasOptions}
      />

      <FormControl
        style={{width: '35%', height: '50px'}}
        className={classes.formControl}
      >
        <TextField
          className={classes.quantidade}
          value={quantidade}
          onChange={(event) => set_quantidade(Number(event.target.value))}
          label="Quantidade"
          variant="outlined"
        />
      </FormControl>

      <Button
        disabled={quantidade === '' || mercadoria === ''}
        onClick={adicionarOrdem}
        variant="contained"
        color="primary"
        size="medium"
      >
        Adicionar Ordem
      </Button>

  </>
  );
}

export default AdicionarOrdem;
