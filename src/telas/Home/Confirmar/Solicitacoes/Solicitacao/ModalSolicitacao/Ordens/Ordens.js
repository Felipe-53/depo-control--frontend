import React from 'react'
import List from '@material-ui/core/List';
import { mapOrdens } from '../mappingFunctions'

const Ordens = ({ ordens }) => {

  return (
    <List style={{width: '100%'}}>
      {mapOrdens(ordens)}
    </List>
  );    
}

export default Ordens
