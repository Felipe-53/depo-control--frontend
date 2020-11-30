import React from 'react';
import Typography  from '@material-ui/core/Typography';

interface UsuarioProps {
  nomeDoUsuario: string
}

const Usuario = ({ nomeDoUsuario }: UsuarioProps) => {
  return (
      <Typography variant="h6" color="textSecondary" component="span" >
        Usuário: <span> </span>
        <Typography variant="h6" color="textPrimary" component="span" >
          {nomeDoUsuario}
        </Typography>
      </Typography>
  );
}

export default Usuario;
