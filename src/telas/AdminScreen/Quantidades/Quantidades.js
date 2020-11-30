import React, { useState, useEffect, useContext } from 'react';
import TabPanel from '../../../components/TabPanel/TabPanel.js';
import SelectOption from './SelectOption/SelectOption';
import DefinirOpcoesDeFiltro from './DefinirOpcoesDeFiltro/DefinirOpcoesDeFiltro.js';
import TabelaQuantidades from './TabelaQuantidades/TabelaQuantidades.js';
import { Triggers } from '../AdminScreen.js';
import { fetchGetEndpoint } from '../../../utils/fetchEndpoints';
import Feedback from '../../../components/Feedback/Feedback';

const Quantidades = ({value, index}) => {

  const {triggerFetchQuantidades} = useContext(Triggers);

  const [quantidades, set_quantidades] = useState([]);
  const [depositos, set_depositos] = useState([]);
  const [mercadorias, set_mercadorias] = useState([]);
  
  const [fetchFeedback, set_fetchFeedback] = useState(null);

  const [filtro, set_filtro] = useState('deposito');
  const [option, set_option] = useState(''); 

  useEffect(() => {
    async function getData () {
      try {
        let data = await fetchGetEndpoint('/api/quantidades');
        set_depositos(data['depositos']);
        set_mercadorias(data['mercadorias']);
        set_quantidades(data['quantidades']);
      } catch (err) {
        set_fetchFeedback(
          <Feedback type="error" message={err.message} closeHandler={set_fetchFeedback} />
        );
      }
    }

    getData();
  }, [triggerFetchQuantidades]);

  return (
    <TabPanel value={value} index={index}>
      {fetchFeedback}
      
      <DefinirOpcoesDeFiltro
        set_filtro={set_filtro}
        set_option={set_option}
      />

      <SelectOption
        filtro={filtro}
        mercadorias={mercadorias}
        depositos={depositos}
        set_option={set_option}
        option={option}
      />

      <TabelaQuantidades
        quantidades={quantidades}
        depositos={depositos}
        mercadorias={mercadorias}
        filtro={filtro}
        option={option}
      />

    </TabPanel>
  );
}

export default Quantidades;