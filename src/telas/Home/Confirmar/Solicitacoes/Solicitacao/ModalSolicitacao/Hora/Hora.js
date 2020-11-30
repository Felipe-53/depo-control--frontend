import React from 'react'
import Typography from '@material-ui/core/Typography';

const Hora = ({ hora }) => {
  return (
    <div>
      <Typography variant="h6" color="textSecondary" component="span" >
        Solicitada às: <span> </span>
        <Typography variant="h6" color="textPrimary" component="span" >
          {hora}
        </Typography>
      </Typography>
    </div>
  );
}

export default Hora;
