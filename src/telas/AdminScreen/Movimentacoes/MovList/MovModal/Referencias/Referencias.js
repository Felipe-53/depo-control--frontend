import React, { useContext, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { fetchPostEndpoint } from '../../../../../../utils/fetchEndpoints.js';
import Feedback from '../../../../../../components/Feedback/Feedback';
import { Triggers } from '../../../../AdminScreen.js';

const Referencias = ({ originalOrdens, set_referenciaFeedback, closeMovModal }) => {

  /* Context */
  const { set_triggerFetchMovs } = useContext(Triggers);

  const [ordens, set_ordens] = useState(originalOrdens);
  const [disabled, set_disabled] = useState(true);

  const handleChange = (event, index) => {

    set_ordens(prevOrdens => {
      
      const updatedOrdens = [...prevOrdens];
      updatedOrdens[index].referencia = event.target.checked;

      return updatedOrdens
    });

    if (disabled) {
      set_disabled(false);
    }
    
  }

  const enviarReferencias = () => {
    
    fetchPostEndpoint('/api/estabelecer_referencia', ordens)
      
    .then(response => {
      set_referenciaFeedback(
        <Feedback
          type="success"
          message={response}
          closeHandler={set_referenciaFeedback}
        />
      );
      closeMovModal();
      set_triggerFetchMovs(prev => prev+1);
    })

    .catch(err => {
      set_referenciaFeedback(
        <Feedback
          type="error"
          message={err.message}
          closeHandler={set_referenciaFeedback}
        />
      );
      closeMovModal();
    });
  
  }

  const entries = ordens.map((ordem, index) => {
    return (
      <FormControlLabel style={{display: 'block'}}
        key={ordem['id']}
        control={
          <Checkbox
            checked={ordem['referencia']}
            onChange={(event) => handleChange(event, index)}
         />
        }
        label={ordem['mercadoria']['nome']}
      />
    );
  });

  

  return (
    <div style={{marginBottom: '50px'}}>

      {entries}

      <Button
        style={{marginTop: '50px'}}
        disabled={disabled}
        variant="contained"
        size="large"
        color="primary"
        onClick={enviarReferencias}
      >
        Confirmar
      </Button>

    </div>
  );

}

export default Referencias
