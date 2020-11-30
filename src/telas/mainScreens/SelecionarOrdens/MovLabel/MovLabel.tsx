import React from 'react'
import Typography  from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  movLabel: {
    margin: '4% 0 1% 0',
  }
});


type MovLabelProps = {
  tipo_mov: 'entrada' | 'saida',
}

const MovLabel = ({ tipo_mov }: MovLabelProps) => {
  const classes = useStyles();

  const movAttributes = setMovAttributes(tipo_mov);

  return (
    <Typography color={movAttributes.movLabelColor} className={classes.movLabel} variant="h3">
      {movAttributes.movLabel}
    </Typography>
  );
}

export default MovLabel;


type attributes = {
  movLabel: 'ENTRADA' | 'SAÍDA',
  movLabelColor: 'primary' | 'secondary'
}

function setMovAttributes (tipo_mov: "entrada" | "saida") {

  let rv: attributes;

  rv = {
    movLabel: 'ENTRADA',
    movLabelColor: "primary"
  }
  
  if (tipo_mov === 'saida') {
    rv = {
      movLabel: 'SAÍDA',
      movLabelColor: "secondary"
    }
  }
  
  return rv;
}
