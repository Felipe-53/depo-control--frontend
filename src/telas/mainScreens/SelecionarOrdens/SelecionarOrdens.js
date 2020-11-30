import React, { useState, useEffect, useContext } from 'react';
import OrdemModal from './OrdemModal/OrdemModal';
import Button from '@material-ui/core/Button';
import useStyles from './styles.js';
import { ServerDataManager } from '../../Telas';
import { fetchGetEndpoint } from '../../../utils/fetchEndpoints.js';
import Feedback from '../../../components/Feedback/Feedback';
import Ordens from './Ordens/Ordens';
import MovLabel from './MovLabel/MovLabel';
import Usuario from './Usuario/Usuario';
import AdicionarOrdemBtn from './AdicionarOrdemBtn/AdicionarOrdemBtn';

const Mercadorias = ({ screenChangeHandler, nomeDoUsuario, sendSolicitacao }) => {
  const classes = useStyles();

  const { ordens, set_ordens, tipo_mov } = useContext(ServerDataManager);

  const [openOrdemModal, set_openOrdemModal] = useState(false);
  const [mercadoriasOptions, set_mercadoriasOptions] = useState([]);
  const [fetchFeedback, set_fetchFeedback] = useState(null);
  const [warnDuplicateMercadoria, set_warnDuplicateMercadoria] = useState(null);

  useEffect(() => {
    async function getMercadorias () {
      try {
        let fetchedMercadoriasOptions = await fetchGetEndpoint('/api/mercadorias');
        set_mercadoriasOptions(fetchedMercadoriasOptions);
      } catch (err) {
        set_fetchFeedback(
          <Feedback type="error" message={err.message} closeHandler={set_fetchFeedback} />
        );
      }
    }
    
    getMercadorias();    
  }, []);

  const removeOrdemHandler = (id) => {
    set_ordens(prevOrdens => {
      let updatedOrdens = prevOrdens.filter(ordem => {
        return ordem.id !== id;
      });

      return updatedOrdens;
    });
  }

  const enviarHandler = () => {
    sendSolicitacao();
    set_ordens([]);
    screenChangeHandler('next');
  }

  return (
    <>
      <OrdemModal
        openModal={openOrdemModal}
        set_openModal={set_openOrdemModal}
        set_ordens={set_ordens}
        mercadorias={mercadoriasOptions}
        ordens={ordens}
        set_warnDuplicateMercadoria={set_warnDuplicateMercadoria}
      />

      <div className={classes.container}>
        {fetchFeedback}
        {warnDuplicateMercadoria}

        <MovLabel tipo_mov={tipo_mov} />

        <Usuario nomeDoUsuario={nomeDoUsuario} />

        <Ordens
          ordens={ordens}
          removeOrdemHandler={removeOrdemHandler}
        />

        <Button
          disabled={ordens.length === 0}
          className={classes.enviarBtn}
          variant="contained"
          color="primary"
          size="large"
          onClick={enviarHandler}>
          
          Enviar
        </Button>

        <AdicionarOrdemBtn set_openModal={set_openOrdemModal} />
      </div>
    </>
  );
}

export default Mercadorias;
