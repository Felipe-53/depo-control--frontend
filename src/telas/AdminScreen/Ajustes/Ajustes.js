import React, { useState, useEffect, useContext } from 'react';
import TabPanel from '../../../components/TabPanel/TabPanel.js';
import Typography from '@material-ui/core/Typography';
import { fetchGetEndpoint, fetchPostEndpoint } from '../../../utils/fetchEndpoints.js';
import Feedback from '../../../components/Feedback/Feedback';
import Button from '@material-ui/core/Button';
import DropdownMenu from '../../../components/DropdownMenu/DropdownMenu';
import AdicionarOrdem from './AdicionarOrdem/AdicionarOrdem.js';
import OrdensDoAjuste from './OrdensDoAjuste/OrdensDoAjuste.js';
import { Triggers } from '../AdminScreen.js';

const Ajustes = ({ value, index, set_tabIndex, set_enviarAjusteFeedback }) => {

  const {set_triggerFetchQuantidades, set_triggerFetchMovs} = useContext(Triggers);

  const [depositosOptions, set_depositosOptions] = useState([]);
  const [mercadoriasOptions, set_mercadoriasOptions] = useState([]);
  const [usuariosOptions, set_usuariosOptions] = useState([]);

  /* data that will be sent to the server */
  const [deposito, set_deposito] = useState('');
  const [usuario, set_usuario] = useState('');
  const [tipo_mov, set_tipo_mov] = useState('');
  const [ordens, set_ordens] = useState([]);

  /* feedback */
  const [fetchFeedback, set_fetchFeedback] = useState(null);
  const [warnDuplicateMercadoria, set_warnDuplicateMercadoria] = useState(null);

  async function enviarAjuste () {

    const data = {
      'deposito_id': deposito['id'],
      'tipo_mov': tipo_mov,
      'usuario_id': usuario['id'],
      'ordens': ordens,
    }

    try {
      let response = await fetchPostEndpoint('/api/criar_ajuste', data);
      set_enviarAjusteFeedback(
        <Feedback type="success" message={response} closeHandler={set_enviarAjusteFeedback} />
      );
      set_tabIndex(1);
      resetValues();
      set_triggerFetchQuantidades(prev => prev+1);
      set_triggerFetchMovs(prev => prev+1);

    } catch (err) {
      set_enviarAjusteFeedback(
        <Feedback type="error" message={err.message} closeHandler={set_enviarAjusteFeedback} />
      );
      set_tabIndex(1);
      resetValues();
    }
  }

  function resetValues () {
    set_deposito('');
    set_usuario('');
    set_tipo_mov('');
    set_ordens([]);
  }

  useEffect(() => {
    async function getData () {
      try {
        let depositos = await fetchGetEndpoint('/api/depositos');
        set_depositosOptions(depositos);
        let mercadorias = await fetchGetEndpoint('/api/mercadorias');
        set_mercadoriasOptions(mercadorias);
        let usuarios = await fetchGetEndpoint('/api/usuarios');
        set_usuariosOptions(usuarios);
      } catch (err) {
        set_fetchFeedback(
          <Feedback type="error" message={err.message} closeHandler={set_fetchFeedback} />
        );
      }
    }

    getData();
  }, []);

  
  function disableEnviarBtn () {
    if (deposito === '' ||
        usuario === '' ||
        tipo_mov === '' ||
        ordens.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <TabPanel value={value} index={index}>

      {fetchFeedback}
      {warnDuplicateMercadoria}

      <Typography variant="h6" color="primary" style={{margin: '20px 0 30px 0'}}>
        Novo Ajuste
      </Typography>

      <DropdownMenu
        label="Depósito"
        value={deposito}
        set_value={set_deposito}
        options={depositosOptions}
      />

      <DropdownMenu 
        label="Movimentação"
        value={tipo_mov}
        set_value={set_tipo_mov}
        /* Defined manually [top of the file] for compatibility */
        options={['entrada', 'saida']}
      />

      <DropdownMenu 
        label="Usuário"
        value={usuario}
        set_value={set_usuario}
        options={usuariosOptions}
      />

      <AdicionarOrdem
        mercadoriasOptions={mercadoriasOptions}
        ordens={ordens}
        set_ordens={set_ordens}
        set_warnDuplicateMercadoria={set_warnDuplicateMercadoria}
      />
      
      <OrdensDoAjuste
        ordens={ordens}
        set_ordens={set_ordens}
      />

      <Button
        disabled={disableEnviarBtn()}
        style={{margin: '50px 0'}}
        variant="contained"
        size="large"
        color="primary"
        onClick={enviarAjuste}
      >
        Enviar
      </Button>      

    </TabPanel>
  );
}

export default Ajustes;