import React, { useState } from 'react';
import Login from './Login/Login.js';
import Deposito from './Deposito/Deposito.js';

interface AuthProps {
  redirectToApp(): void, 
}

type Views = {
  Login: React.ReactElement,
  Deposito: React.ReactElement,
  [other: string]: React.ReactElement
}

const Auth: React.FC<AuthProps> = ({ redirectToApp }) => {

  const [currentView, set_currentView] = useState('Login');

  const views: Views = {
    'Login': <Login
    redirectToDeposito={() => set_currentView('Deposito')}
    redirectToApp={redirectToApp}
    />,
  
    'Deposito': <Deposito redirectToApp={redirectToApp} />,
  } 
  
  return views[currentView];
}

export default Auth;
