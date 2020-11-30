import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formLabel: {
    margin: '7% 0 6% 0',
    textAlign: 'center',
    fontSize: '1rem !important',
  }
});

const DefinirOpcoesDeFiltro = ({ set_option, set_filtro}) => {
  const classes = useStyles();

  const changeFiltroHandler = (event) => {
    set_option('') // avoid warning message!
    set_filtro(event.target.value);
  };

  return (
    <FormControl component="fieldset">
        <FormLabel className={classes.formLabel} component="div">Filtrar por:</FormLabel>
      
        <RadioGroup onChange={changeFiltroHandler} row={true} defaultValue="deposito">
          <FormControlLabel
            value="deposito"
            control={<Radio color="primary" />}
            label="Depósito"
            labelPlacement="top"
          />
          
          <FormControlLabel
            value="mercadoria"
            control={<Radio color="primary" />}
            label="Mercadoria"
            labelPlacement="top"
          />
        </RadioGroup>

    </FormControl>
  );
}

export default DefinirOpcoesDeFiltro;
