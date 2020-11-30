import React from 'react';
import SelecionarUsuario from './SelecionarUsuario/SelecionarUsuario';
import SelecionarDeposito from './SelecionarDeposito/SelecionarDeposito';
import SelecionarOrdens from './SelecionarOrdens/SelecionarOrdens';

const generateMainScreens = ({
  nomeDoDeposito, nomeDoUsuario,
  set_nomeDoDeposito, set_nomeDoUsuario,
  sendSolicitacao
}) => {

  let mainScreens = [
    <SelecionarUsuario
      screenName="Usuário"
      key="Usuário"
      set_nomeDoUsuario={set_nomeDoUsuario}
    />,

    <SelecionarDeposito 
      screenName="Depósito"
      key="Depósito"
      set_nomeDoDeposito={set_nomeDoDeposito}
    />,

    <SelecionarOrdens
      screenName={nomeDoDeposito}
      key="Ordens"
      nomeDoUsuario={nomeDoUsuario}
      sendSolicitacao={sendSolicitacao}
    />
  ]

  if (localStorage.getItem('role') === 'funcio') {
    mainScreens.splice(1, 1);
  }

  return mainScreens;
}


export default generateMainScreens;
