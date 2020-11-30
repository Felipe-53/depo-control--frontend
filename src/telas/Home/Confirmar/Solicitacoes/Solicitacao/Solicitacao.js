import React from 'react';
import ModalSolicitacao from './ModalSolicitacao/ModalSolicitacao';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

function Solicitacao({ solicitacao, set_modalSolicitacao, removeSolicitacaoFromList, set_feedbackConfirmarSolicitacao }) {
  
  const usuario = solicitacao['usuario_nome'];
  const numDeposito = solicitacao['deposito_nome'].split(' ')[1];
  const hora = solicitacao['hora'];

  const openModal = () => {
    set_modalSolicitacao(
      <ModalSolicitacao
        solicitacao={solicitacao}
        removeSolicitacaoFromList={removeSolicitacaoFromList}
        set_feedbackConfirmarSolicitacao={set_feedbackConfirmarSolicitacao}
        closeModal={() => set_modalSolicitacao(null)}
      />
    );
  }

  return (

    <ListItem onClick={openModal} button={true} divider={true}>

      <ListItemIcon>
        <ListItemText
          primaryTypographyProps={{variant: 'h6', color: 'primary'}}
          primary={`Dep. ${numDeposito}`}
        />
        <Divider orientation="vertical" flexItem={true} variant="middle" />
      </ListItemIcon>
      
      <ListItemText
        primaryTypographyProps={{variant: 'h6'}}
        primary={usuario}
      />

      <ListItemText
        style={{position: 'absolute', right: 16}}
        primaryTypographyProps={{color: "textSecondary"}}
        primary={hora}
      />

    </ListItem>

  );
}

export default Solicitacao;
