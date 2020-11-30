import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MovRefIcon  from '@material-ui/icons/VerifiedUser';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const iconMapping = {
  'confirmada': <CheckCircleOutlineIcon htmlColor="green" />,
  'cancelada': <CancelOutlinedIcon htmlColor="red" />,
}

const MovItem = ({referencia, ajuste, nomeDeposito, tipo_mov, status, data_ultima_atualizacao, openModal}) => {

  const useStyles = makeStyles(theme => ({
  
    listItem: {
      backgroundColor: ajuste? theme.palette.warning.light : 'white',
    },
    
    data_ultima_atualizacao: {
      position: 'absolute',
      right: '16px',
    }
  
  }));


  const classes = useStyles();

  return (
    <ListItem
      className={classes.listItem}
      button={true}
      divider={true}
      onClick={openModal}
    >
      <ListItemIcon>
        {referencia? <MovRefIcon htmlColor="green"/> : iconMapping[status]}
      </ListItemIcon>

      <ListItemText
        primary={'Dep. ' + nomeDeposito.split(' ')[1]}
        primaryTypographyProps={{variant: "h6"}}
      />

      <ListItemText
        style={{'textAlign': 'center'}}
        primary={tipo_mov==='entrada'? 'Entrada' : 'Saída'}
        primaryTypographyProps={{color: tipo_mov==='entrada'? "primary" : "secondary", variant: "h6" }}
  
      />

      <ListItemText
        style={{'textAlign': 'right'}}
        primaryTypographyProps={{variant: "h6", color: "textSecondary"}}
        primary={data_ultima_atualizacao}

      />
    </ListItem>
  );
}

export default MovItem;