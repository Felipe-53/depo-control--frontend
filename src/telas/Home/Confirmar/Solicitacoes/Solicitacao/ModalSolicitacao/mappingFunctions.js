import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Ordem from './Ordem/Ordem.js';

function mapUsers (users) {

  if (users.length === 0) return null;

  const mappedUsers = users.map(user => {
    return(
      <MenuItem key={user['nome']} value={user}>
        {user['nome']}
      </MenuItem>
    );
  });
  
  return mappedUsers;
}

function mapOrdens (ordens) {

  if (ordens.length === 0) return null;

  const mappedOrdens = ordens.map((ordem, index) => {
    return (
      <Ordem
        key={index}
        qtd={ordem['qtd']}
        unidade={ordem['unidade']}
        mercadoria={ordem['nome']}
      />
    );
  });

  return mappedOrdens;
}

export {mapUsers, mapOrdens};