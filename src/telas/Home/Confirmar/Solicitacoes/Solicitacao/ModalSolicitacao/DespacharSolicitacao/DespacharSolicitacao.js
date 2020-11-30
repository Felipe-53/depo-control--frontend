import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

const ROLE = localStorage.getItem('role');

const styles = {
  checkbox: {
    marginBottom: '1.5rem',
    width: '90%',
    justifyContent: 'center',
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
  }
}

const DespacharSolicitacao = ({ isTheUserDefined, despacharSolicitacao }) => {

  return (
    <div style={styles.btnContainer}>
      <ConfirmarSolicitacao
        isTheUserDefined={isTheUserDefined}
        despacharSolicitacao={despacharSolicitacao}
      />    

      <CancelarSolicitacao
        isTheUserDefined={isTheUserDefined}
        despacharSolicitacao={despacharSolicitacao}
      />
    </div>
  );

}

const ConfirmarSolicitacao = ({despacharSolicitacao, isTheUserDefined}) => {

  return (
    <Button
      disabled={!isTheUserDefined}
      size="large"
      variant="contained"
      color="primary"
      style={styles.despacharBtn}
      onClick={() => despacharSolicitacao('/api/confirmar_solicitacao')}
    >
      Confirmar
    </Button>
  );

}

const CancelarSolicitacao = ({despacharSolicitacao, isTheUserDefined}) => {

  const [ consentCancel, set_consentCancel] = useState(false);

  return ROLE === 'admin'? (
    <>
      <FormControlLabel
        style={styles.checkbox}
        control={(
          <Checkbox
            checked={consentCancel}
            onChange={(event) => set_consentCancel(event.target.checked)}
          />
        )}
        label="Quero cancelar a solicitação"
      />

      <Button
        disabled={ !isTheUserDefined || !consentCancel}
        size="large"
        variant="contained"
        color="secondary"
        style={styles.despacharBtn}
        onClick={() => despacharSolicitacao('/api/cancelar_solicitacao')}
      >
        Cancelar
      </Button>
    </>
  ) : null;

}

export default DespacharSolicitacao;
