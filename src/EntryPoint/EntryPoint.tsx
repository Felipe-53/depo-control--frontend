import React, { useState } from 'react';
import './EntryPoint.css';
import App from '../App/App.js';
import Auth from '../Auth/Auth';

const EntryPoint: React.FC = () => {

  const [authenticated, set_authenticated] = useState<boolean>(
    localStorage.getItem('jwt')? true : false  
  );

  return (
    authenticated?
    <App /> :
    <Auth redirectToApp={() => set_authenticated(true)} />
  );
}

export default EntryPoint;
