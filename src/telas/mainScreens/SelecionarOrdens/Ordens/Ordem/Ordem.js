import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

function Ordem({qtd, unidade, mercadoria, removeOrdemHandler}) {
  return (
    <>
    <ListItem>
      <ListItemIcon>
        <HighlightOffIcon onClick={removeOrdemHandler} color="secondary" />
      </ListItemIcon>

      <ListItemText primaryTypographyProps={{variant: 'h6'}} primary={qtd} />

      <ListItemText primaryTypographyProps={{variant: 'h6'}} primary={unidade} />

      <ListItemText primaryTypographyProps={{variant: 'h6'}} primary={mercadoria} />

    </ListItem>

    <Divider />

    </>
  );
}

export default Ordem;
