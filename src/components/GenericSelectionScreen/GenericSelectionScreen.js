import React, { useEffect, useState } from 'react';
import  ButtonGroup  from '@material-ui/core/ButtonGroup';
import  Button  from '@material-ui/core/Button';
import  Typography  from '@material-ui/core/Typography';
import { fetchGetEndpoint } from '../../utils/fetchEndpoints';
import Feedback from '../../components/Feedback/Feedback';
import useStyles from './genericSelectionScreenStyles';

/* "campo" é o nome da informação genérica que a tela pretende
determinar. Especificamente, Depósito ou Usuário. */

const GenericSelectionScreen = ({ screenChangeHandler, set_nomeDoCampo,
  set_campo_id, endpoint, titleText }) => {
  const classes = useStyles();
  
  const [options, set_options] = useState(undefined);
  const [fetchFeedback, set_fetchFeedback] = useState(null);

  const chooseOptionHandler = (option) => {
    screenChangeHandler('next');
    set_campo_id(option['id']);
    set_nomeDoCampo(option['nome']);
  }

  // map option obj to Mui Buttons
  const mapOptions = (options) => {
    const optionBtns = options.map(option => {
      return (
        <Button
          className={classes.optionBtn}
          key={option['nome']}
          onClick={() => chooseOptionHandler(option)}
        >
          {option['nome']}
        </Button>
      );
    });

    return optionBtns;
  }

  useEffect(() => {
    async function getOptions () {
      try {
        let options = await fetchGetEndpoint(endpoint);
        set_options(options);
      } catch (err) {
        set_fetchFeedback(
          <Feedback type="error" message={err.message} closeHandler={set_fetchFeedback} />
        );
      }
    }

    getOptions();
  }, []);

  return (
    <>
      {fetchFeedback}

      <Typography 
        variant="h5"
        className={classes.title}
      >
        {titleText}
      </Typography>

      <ButtonGroup
        className={classes.btnContainer}
        orientation="vertical"
        variant="outlined"
        color="primary"
        size="large"
      >
        {options? mapOptions(options) : null}
      </ButtonGroup>
    </>
  );
}

export default GenericSelectionScreen
