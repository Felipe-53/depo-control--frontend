import React, { useState, useEffect, useContext } from 'react';
import Solicitacoes from './Solicitacoes/Solicitacoes';
import Fab from '@material-ui/core/Fab'; // Floating Action Button
import SyncIcon from '@material-ui/icons/Sync';
import useStyles from './confirmarStyles';
import { fetchGetEndpoint } from '../../../utils/fetchEndpoints.js';
import Feedback from '../../../components/Feedback/Feedback';
import socket from '../../../utils/socket.js';
import { NovaSoliciataoTracker } from '../../Telas';

const ROLE = localStorage.getItem('role');

const Confirmar = ({ activeContainer, set_modalSolicitacao, set_badgeInvisible}) => {
  const classes = useStyles();

  const { novaSolicitacao } = useContext(NovaSoliciataoTracker);

  const [solicitacoes, set_solicitacoes] = useState([]);
  const [feedbackConfirmarSolicitacao, set_feedbackConfirmarSolicitacao] = useState(null);
  const [feedbackFetchSolicitacoes, set_feedbackFetchSolicitacoes] = useState(null);

  const updateSolicitacoes = async () => {
    let endpoint = '/api/solicitacoes';

    if (ROLE === 'funcio') {
      const deposito_id = JSON.parse(localStorage.getItem('deposito'))['id'];
      endpoint = endpoint + `?id=${deposito_id}`;
    }

    try {
      const solicitacoes = await fetchGetEndpoint(endpoint);
      set_solicitacoes(solicitacoes);
    } catch (err) {
      set_feedbackFetchSolicitacoes(
        <Feedback type="error" message={err.message} closeHandler={set_feedbackFetchSolicitacoes} />
      );
    }

  }

  const removeSolicitacaoFromList = (mov_id) => {
    set_solicitacoes(prevSolicitacoes => {
      
      const updatedSolicitacoes = prevSolicitacoes.filter(solicitacao => {
        return solicitacao['mov_id'] !== mov_id;
      });

      return updatedSolicitacoes;
    });
  }

  useEffect(() => {
    updateSolicitacoes();

    socket.on('connect', () => {
      let dispositivo;
      
      if (localStorage.getItem('deposito')) {
        dispositivo = JSON.parse(localStorage.getItem('deposito'))['nome'];
      } else {
        dispositivo = 'Matriz';
      }

      socket.emit('manage_connection', dispositivo);
    });

    socket.on('nova_solicitacao', () => {
      updateSolicitacoes();
    });

    socket.on('solicitacao_confirmada', (mov) => {
      removeSolicitacaoFromList(mov['id']);
    });

  }, []);

  /* NOTE: The server doesn't emit 'nova_solicitacao' event to the client that made the
  solicitacao. That is not to risk the client not being notified of a solicitacao
  sent by himself due to connection problems. So we take care of it ourselves. */
  useEffect(() => {
    updateSolicitacoes();
  }, [novaSolicitacao])

  useEffect(() => {
    set_badgeInvisible(solicitacoes.length === 0);
  }, [solicitacoes])


  return activeContainer === 'confirmar'? (
    <div className={classes.listContainer}>
      {feedbackConfirmarSolicitacao}
      {feedbackFetchSolicitacoes}

      <Solicitacoes
        solicitacoes={solicitacoes}
        set_modalSolicitacao={set_modalSolicitacao}
        removeSolicitacaoFromList={removeSolicitacaoFromList}
        set_feedbackConfirmarSolicitacao={set_feedbackConfirmarSolicitacao}
      />

      <Fab color="primary" className={classes.Fab} onClick={() => updateSolicitacoes()}>
        <SyncIcon />
      </Fab>

    </div>    
  ) : null;
}

export default Confirmar;
