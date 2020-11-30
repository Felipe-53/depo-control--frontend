import React, { useState } from 'react';
import Screens from '../components/Screens/Screens.js';
import Home from './Home/Home.js';
import AdminScreen from './AdminScreen/AdminScreen.js';
import generateMainScreens from './mainScreens/mainScreens';
import { fetchPostEndpoint } from '../utils/fetchEndpoints.js';
import Feedback from '../components/Feedback/Feedback';

export const ServerDataManager = React.createContext();
export const NovaSoliciataoTracker = React.createContext();

const Telas = () => {
  const [usuario_id, set_usuario_id] = useState(null);
  const [deposito_id, set_deposito_id] = useState(null);
  const [tipo_mov, set_tipo_mov] = useState(null);
  const [ordens, set_ordens] = useState([]);

  // shipped via react context API
  const serverData = {
    usuario_id: usuario_id,
    deposito_id: deposito_id,
    tipo_mov: tipo_mov,
    ordens: ordens,
    set_usuario_id: set_usuario_id,
    set_deposito_id: set_deposito_id,
    set_tipo_mov: set_tipo_mov,
    set_ordens: set_ordens,
  }

  const sendSolicitacao = async () => {
    let stored_deposito = undefined;
    if (localStorage.getItem('deposito')) {
      stored_deposito = JSON.parse(localStorage.getItem('deposito'));
    }

    let data = {
      deposito_id: stored_deposito? stored_deposito['id'] : deposito_id,
      usuario_id: usuario_id,
      tipo_mov: tipo_mov,
      ordens: ordens,
    }

    try {
      let message = await fetchPostEndpoint('/api/solicitar_movimentacao', data);
      set_novaSolicitacao(prevNum => {return prevNum + 1});
      set_feedbackSendSolicitacao(
        <Feedback type="success" message={message} closeHandler={set_feedbackSendSolicitacao} />
      );
    } catch (err) {
      set_feedbackSendSolicitacao(
        <Feedback type="error" message={err.message} closeHandler={set_feedbackSendSolicitacao} />
      );
    }
  }
  
  const [novaSolicitacao, set_novaSolicitacao] = useState(0);
  const [feedbackSendSolicitacao, set_feedbackSendSolicitacao] = useState(null);
  
  // shipped via react context API
  const novaSolicitacaoMessenger = {
    novaSolicitacao: novaSolicitacao,
    feedbackSendSolicitacao: feedbackSendSolicitacao
  }


  // these bindings hold data only relevant to the frontend
  const [nomeDoUsuario, set_nomeDoUsuario] = useState(null);
  const [nomeDoDeposito, set_nomeDoDeposito] = useState(null);

  const mainScreens = generateMainScreens({
    nomeDoDeposito: nomeDoDeposito,
    nomeDoUsuario: nomeDoUsuario,
    set_nomeDoDeposito: set_nomeDoDeposito,
    set_nomeDoUsuario: set_nomeDoUsuario,
    sendSolicitacao: sendSolicitacao,
  });

  const adminScreen = (
    <AdminScreen
      screenName="Admin"
      backToMainScreens={() => set_whichScreens('main')}
    />
  );
  
  const [whichScreens, set_whichScreens] = useState('main');
  
  return (
    <ServerDataManager.Provider value={serverData}>
      <NovaSoliciataoTracker.Provider value={novaSolicitacaoMessenger}>
        <Screens>

          <Home
            screenName="Home"
            goToAdminScreen={() => set_whichScreens('admin')}
          />
          
          {whichScreens === 'main' ? mainScreens : adminScreen}

        </Screens>
      </NovaSoliciataoTracker.Provider>
    </ServerDataManager.Provider>
  );
}

export default Telas;
