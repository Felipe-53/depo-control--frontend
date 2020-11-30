import React, { useContext } from 'react';
import GenericSelectionScreen from '../../../components/GenericSelectionScreen/GenericSelectionScreen.js';
import { ServerDataManager } from '../../Telas';

const SelecionarUsuario = ({ screenChangeHandler, set_nomeDoUsuario }) => {
  
  const set_usuario_id = useContext(ServerDataManager)['set_usuario_id'];

  const selecionarUsuario = (
    <GenericSelectionScreen
      screenChangeHandler={screenChangeHandler}
      set_nomeDoCampo={set_nomeDoUsuario}
      set_campo_id={set_usuario_id}

      endpoint="/api/usuarios"
      titleText="Quem está usando?"
    />
  );

  return selecionarUsuario;
}

export default SelecionarUsuario;
