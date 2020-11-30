import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import {mapUsers} from '../mappingFunctions';

const style = {
  fontWeight: 400,
  margin: '5% 0 8% 0',
}

const SelecionarUsuario = ({ userOptions, user, set_user }) => {
  return (
    <>
      <Typography variant="body1" color="textSecondary" style={style} >
        Quem está conferindo?
      </Typography>

      <FormControl style={{width: '70%'}} >
        <InputLabel>Usuário</InputLabel>
        <Select
          value={user}
          onChange={(event) => set_user(event.target.value)}
        >
          {mapUsers(userOptions)}
        </Select>
      </FormControl>
    </>
  )
}

export default SelecionarUsuario
