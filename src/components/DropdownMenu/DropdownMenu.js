import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles ({
  formControl: {
    width: '70%',
    marginBottom: '50px',
  }
});

const mapping = {
  'entrada': 'Entrada',
  'saida': 'Saída',
  '': 'Nenhum',
}

function mapOptions (options) {

  if (options.length !== 0) {

    const mappedOptions = options.map((option, index) => {
      return (
        <MenuItem
          key={index}
          value={option}
        >
          {typeof(option) === 'string'? mapping[option] : option['nome']}
        </MenuItem>
      );
    });

    return mappedOptions;
  }

  return null;
}

const DropDownMenu = ({label, value, set_value, options}) => {

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(event) => set_value(event.target.value)}
      >
        {mapOptions(options)}
      </Select>
    </FormControl> 
  );
}

export default DropDownMenu;
