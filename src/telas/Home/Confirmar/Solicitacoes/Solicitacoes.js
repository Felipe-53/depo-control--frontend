import React from 'react'
import Solicitacao from './Solicitacao/Solicitacao';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const Solicitacoes = ({solicitacoes, set_modalSolicitacao, removeSolicitacaoFromList, set_feedbackConfirmarSolicitacao}) => {
  
  let listaDeSolicitacoes = null;
  let title = 'Sem novas solicitações';
  let titleColor = "primary";

  if (solicitacoes.length !== 0) {
    
    title = 'Solicitações pendentes';
    titleColor = "secondary";

    listaDeSolicitacoes = solicitacoes.map(solicitacao => {
      return (
        <Solicitacao
          key={solicitacao['mov_id']}
          solicitacao={solicitacao}
          set_modalSolicitacao={set_modalSolicitacao}
          removeSolicitacaoFromList={() => removeSolicitacaoFromList(solicitacao['mov_id'])}
          set_feedbackConfirmarSolicitacao={set_feedbackConfirmarSolicitacao}
        />
      );
    });
  }
  
  return (
    <>
      <Typography style={{margin: '1rem 0'}} color={titleColor} variant="h6">
        {title}
      </Typography>

      <Divider />

      {listaDeSolicitacoes}
    </>
  );
}

export default Solicitacoes
