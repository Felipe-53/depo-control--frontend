import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './ordemModalStyles';
import FullscreenModal from '../../../../components/FullscreenModal/FullscreenModal.js';
import Feedback from '../../../../components/Feedback/Feedback';

export default function Modal({ set_openModal, openModal, set_ordens, mercadorias, ordens, set_warnDuplicateMercadoria }) {
  const classes = useStyles();

  /* only relevant in the client-side */
  const [idOrdemManager, set_idOrdemManager] = useState(0);

  const [mercadoria, set_mercadoria] = useState(null);
  const [quantidade, set_quantidade] = useState('');

  const confirmHandler = () => {
    set_openModal(false);

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

        return
      }
    }

    let newOrdem = {
      id: idOrdemManager,
      
      /* server data */
      qtd: quantidade,
      mercadoria_id: mercadoria.id,
      
      /* client-only data */
      nomeMercadoria: mercadoria.nome,
      unidade: mercadoria.unidade,
    }

    set_ordens(prevOrdens => {
      return [...prevOrdens, newOrdem]
    });
    set_idOrdemManager(idAnterior => {
      return idAnterior + 1;
    });

    /* Reset values */
    set_mercadoria(null);
    set_quantidade('');
  }

  return (
    <FullscreenModal
      appBarTitle="Ordem"
      closeModalHandler={() => set_openModal(false)}
      visible={openModal}
    >

      <Typography className={classes.mercadoriaLabel} variant="h5">
        Mercadoria
      </Typography>

      <Autocomplete
        onChange={(event, value) => set_mercadoria(value)}
        value={mercadoria}
        options={mercadorias}
        getOptionLabel={(option) => option.nome}
        openOnFocus={true}
        renderInput={(params) => <TextField color="primary" {...params} variant="outlined" />}

        popupIcon={null}
        closeIcon={null}
        className={classes.autoComplete}
        fullWidth={true}
      />

      <Typography className={classes.quantidadeLabel} variant="h5">
        Quantidade
      </Typography>

      <TextField
        onChange={event => set_quantidade(event.target.valueAsNumber)}
        value={quantidade}
        className={classes.qtd}
        variant="outlined"
        type="number"
      />

      <Button
        disabled={quantidade === '' || mercadoria['nome'] === ''}
        size="large"
        variant="contained"
        color="primary"
        className={classes.confirmBtn}
        onClick={confirmHandler}
      >
        Confirmar
      </Button>

    </FullscreenModal>
  );
}
