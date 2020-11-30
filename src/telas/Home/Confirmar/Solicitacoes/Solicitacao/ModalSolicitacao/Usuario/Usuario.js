import React from 'react';
import Typography from '@material-ui/core/Typography';

const Usuario = ({ usuario }) => {
  return (
    <div>
      <Typography variant="h6" color="textSecondary" component="span" >
        Usuário: <span> </span>
        <Typography variant="h6" color="textPrimary" component="span" >
          {usuario}
        </Typography>
      </Typography>
    </div>
  );
}

export default Usuario;
