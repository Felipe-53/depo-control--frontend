import React, { useContext } from 'react';
import GenericSelectionScreen from '../../../components/GenericSelectionScreen/GenericSelectionScreen.js';
import { ServerDataManager } from '../../Telas';

const SelecionarDeposito = ({ screenChangeHandler, set_nomeDoDeposito }) => {
  
  const set_deposito_id = useContext(ServerDataManager)['set_deposito_id'];

  const selecionarDeposito = (
    <GenericSelectionScreen
      screenChangeHandler={screenChangeHandler}
      set_nomeDoCampo={set_nomeDoDeposito}
      set_campo_id={set_deposito_id}

      endpoint="/api/depositos"
      titleText="Qual o depósito?"
    />
  );

  return selecionarDeposito;
}

export default SelecionarDeposito;
