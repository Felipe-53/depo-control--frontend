import React from 'react';
import DropdownMenu from '../../../../components/DropdownMenu/DropdownMenu';

const SelectOption = ({ filtro, option, set_option, mercadorias, depositos }) => {
  if (depositos.length ===0 || mercadorias.length === 0) return null;

  const mapping = {
    'deposito': (
      <DropdownMenu
        label="Depósito"
        options={depositos}
        value={option}
        set_value={set_option}
      />
    ),

    'mercadoria': (
      <DropdownMenu
        label="Mercadoria"
        options={mercadorias}
        value={option}
        set_value={set_option}
      />
    ),
  }

  return mapping[filtro];
}

export default SelectOption
