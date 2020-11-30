import React, { useEffect, useState, useContext } from 'react';
import TabPanel from '../../../components/TabPanel/TabPanel.js';
import DefinirFiltros from './DefinirFiltros/DefinirFiltros';
import MovList from './MovList/MovList';
import { fetchGetEndpoint } from '../../../utils/fetchEndpoints.js';
import Typography from '@material-ui/core/Typography';
import Feedback from '../../../components/Feedback/Feedback';
import { Triggers } from '../AdminScreen.js';

const Movimentacoes = ({value, index, set_modal}) => {

  const {triggerFetchMovs} = useContext(Triggers);

  const [filtros, set_filtros] = useState({});
  const [movimentacoes, set_movimentacoes] = useState([]);
  const [fetchFeedback, set_fetchFeedback] = useState(null);

  const [referenciaFeedback, set_referenciaFeedback] = useState(null);
  const [cancelMovFeedback, set_cancelMovFeedback] = useState(null);

  useEffect(() => {
    async function getMovimentacoes () {
      try {
        let movs = await fetchGetEndpoint('/api/movimentacoes');
        set_movimentacoes(movs);
      } catch (err) {
        set_fetchFeedback(
          <Feedback type="error" message={err.message} closeHandler={set_fetchFeedback} />
        );
      }
    }
    
    getMovimentacoes();
  }, [triggerFetchMovs]);
  
  return (
    <TabPanel value={value} index={index}>

      {fetchFeedback}
      {referenciaFeedback}
      {cancelMovFeedback}

      <DefinirFiltros
        set_filtros={set_filtros}
      />

      <Typography
        variant="h6"
        color="primary"
        style={{marginBottom: '20px'}}
      >
        Movimentações
      </Typography>

      <MovList
        movimentacoes={movimentacoes}
        filtros={filtros}
        set_modal={set_modal}
        set_referenciaFeedback={set_referenciaFeedback}
        set_cancelMovFeedback={set_cancelMovFeedback}
      />

    </TabPanel>
  );
}

export default Movimentacoes;
