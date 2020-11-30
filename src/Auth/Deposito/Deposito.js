import { Container, Button, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import useStyles from '../authStyles';
import { fetchGetEndpoint } from '../../utils/fetchEndpoints.js';

const Deposito = ({ redirectToApp }) => {
  const classes = useStyles();

  const [depositosOptions, set_depositosOptions] = useState([]);

  useEffect(() => {
    fetchGetEndpoint('/api/depositos')
    .then(depositos => set_depositosOptions(depositos))
    .catch(err => console.log(err));
  }, []);

  const chooseOptionHandler = (deposito) => {
    localStorage.setItem('deposito', JSON.stringify(deposito));
    redirectToApp();
    window.location.reload();
  }

  let options = null;
  if (depositosOptions.length !== 0) {
    options = depositosOptions.map(deposito => {
      return (
        <Button
          className={classes.depoBtns}
          variant="outlined"
          color="primary"
          key={deposito['nome']}
          onClick={() => chooseOptionHandler(deposito)}
        >
          {deposito['nome']}
        </Button>
      );
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>

        <Typography className={classes.title} variant="h4" >
          Depósito Padrão
        </Typography>
      
        {options}

      </div>
    </Container>
  );
}

export default Deposito;
