import React from 'react'
import Typography from '@material-ui/core/Typography';

const style = {
  margin: '4% 0 1% 0'
}

const TipoMov = ({ mov_tipo }) => {

  let movLabel, movLabelColor;
  if (mov_tipo === 'entrada') {
    movLabel="Entrada";
    movLabelColor="primary";
  } else {
    movLabel="Saída";
    movLabelColor="secondary";
  }

  return (
    <Typography color={movLabelColor} style={style} variant="h3">
      {movLabel}
    </Typography>
  )
}

export default TipoMov
