import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function Ordem({qtd, unidade, mercadoria}) {
  return (

    <ListItem divider={true}>

      <ListItemText primaryTypographyProps={{variant: 'h6'}} primary={qtd} />  

      <ListItemText primaryTypographyProps={{variant: 'h6'}} primary={unidade} />

      <ListItemText primaryTypographyProps={{variant: 'h6'}} primary={mercadoria} />

    </ListItem>

  );
}

export default Ordem;