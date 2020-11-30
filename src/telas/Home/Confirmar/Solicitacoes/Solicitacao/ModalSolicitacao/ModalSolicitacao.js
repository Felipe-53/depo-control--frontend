import React, { useState, useEffect } from 'react';
import { fetchPostEndpoint, fetchGetEndpoint } from '../../../../../../utils/fetchEndpoints.js';
import FullscreenModal from '../../../../../../components/FullscreenModal/FullscreenModal.js';
import Feedback from '../../../../../../components/Feedback/Feedback';
import TipoMov from './TipoMov/TipoMov.js';
import Usuario from './Usuario/Usuario.js';
import Hora from './Hora/Hora.js';
import SelecionarUsuario from './SelecionarUsuario/SelecionarUsuario.js';
import Ordens from './Ordens/Ordens';
import DespacharSolicitacao from './DespacharSolicitacao/DespacharSolicitacao';

export default function Modal({ solicitacao, removeSolicitacaoFromList, set_feedbackConfirmarSolicitacao, closeModal }) {
  
  const mov_id = solicitacao['mov_id']
  const deposito_nome = solicitacao['deposito_nome']
  const mov_tipo = solicitacao['mov_tipo']
  const usuario = solicitacao['usuario_nome']
  const hora = solicitacao['hora']
  const ordens = solicitacao['ordens']

  const[userOptions, set_userOptions] = useState([]);
  const[user, set_user] = useState('');

  useEffect(() => {
    fetchGetEndpoint('/api/usuarios')
      .then(userOptions => {
        set_userOptions(userOptions);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const despacharSolicitacao = async (endpoint) => {
    let data = {
      'mov_id': mov_id,
      'usuario_id': user['id'],
    }
  
    try {
      let message = await fetchPostEndpoint(endpoint, data);
      closeModal();
      removeSolicitacaoFromList();
      set_feedbackConfirmarSolicitacao(
        <Feedback type="success" message={message} closeHandler={set_feedbackConfirmarSolicitacao} />
      );
    } catch (err) {
      closeModal();
      set_feedbackConfirmarSolicitacao(
        <Feedback type="error" message={err.message} closeHandler={set_feedbackConfirmarSolicitacao} />
      );
    }
  }

  return (
    <FullscreenModal
      appBarTitle={deposito_nome}
      closeModalHandler={closeModal}
    >

      <TipoMov mov_tipo={mov_tipo} />
      <Usuario usuario={usuario} />
      <Hora hora={hora} />
      <Ordens ordens={ordens} />

      <SelecionarUsuario
        userOptions={userOptions}
        user={user}
        set_user={set_user}
      />

      <DespacharSolicitacao
        despacharSolicitacao={despacharSolicitacao}
        isTheUserDefined={user !== ''}
      />

    </FullscreenModal>
  );
}
