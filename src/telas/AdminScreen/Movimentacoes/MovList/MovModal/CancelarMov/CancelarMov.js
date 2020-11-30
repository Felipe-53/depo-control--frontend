import React, { useState, useEffect, useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { fetchPostEndpoint, fetchGetEndpoint } from '../../../../../../utils/fetchEndpoints.js';
import Feedback from '../../../../../../components/Feedback/Feedback';
import { Triggers } from '../../../../AdminScreen.js';

const CancelarMov = ({mov_id, set_cancelMovFeedback, closeMovModal }) => {

  /* Context */
  const { set_triggerFetchQuantidades, set_triggerFetchMovs } = useContext(Triggers);

  const [consent, set_consent] = useState(false);

  const[users, set_users] = useState([]);
  const[user, set_user] = useState('');

  // API CALL
  useEffect(() => {
    
    fetchGetEndpoint('/api/usuarios')
      .then(users => {
        set_users(users);
      })
      .catch(err => {
        console.log(err);
      })

  }, []);

  const mappedUsers = users.map(user => {
    return(
      <MenuItem key={user['nome']} value={user}>
        {user['nome']}
      </MenuItem>
    );
  });

  const cancelMov = () => {

    const data = {
      'mov_id': mov_id,
      'usuario_id': user['id'],
    }

    fetchPostEndpoint('/api/cancelar_movimentacao', data)

    .then(response => {
      set_cancelMovFeedback(
        <Feedback
          type="success"
          message={response}
          closeHandler={set_cancelMovFeedback}
        />
      );
      closeMovModal();
      set_triggerFetchMovs(prevNum => prevNum+1)
      set_triggerFetchQuantidades(prevNum => prevNum+1)
    })

    .catch(err => {
      set_cancelMovFeedback(
        <Feedback
          type="error"
          message={err.message}
          closeHandler={set_cancelMovFeedback}
        />
      );
      closeMovModal();
    });
  
  }

  return (
    <>
      <FormControlLabel
        control={(
          <Checkbox
            checked={consent}
            onChange={(event) => set_consent(event.target.checked)}
          />
        )}
        label="Estou ciente de que estou prestes a cancelar uma movimentação"
      />

      <FormControl style={{margin: '50px 0', width: '70%'}} >
        <InputLabel>Usuário</InputLabel>
        <Select
          value={user}
          onChange={(event) => set_user(event.target.value)}
        >
          {mappedUsers}
        </Select>
      </FormControl>

      <Button
        disabled={!consent || user === ''}
        variant="contained"
        color="secondary"
        size="large"
        onClick={cancelMov}
      >
        CANCELAR MOVIMENTAÇÃO
      </Button>

    </>
  );
}

export default CancelarMov;
