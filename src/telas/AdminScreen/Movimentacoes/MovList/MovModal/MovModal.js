import React from 'react';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
// import useStyles from './movModalStyles.js';
import Ordens from './Ordens/Ordens.js';
import Quantidades from './Quantidades/Quantidades.js';
import Atualizacoes from './Atualizacoes/Atualizacoes.js';
import Referencias from './Referencias/Referencias.js';
import CancelarMov from './CancelarMov/CancelarMov.js';
import FullscreenModal from '../../../../../components/FullscreenModal/FullscreenModal.js';

function TableWrapper ({title, warning, children}) {
  return(
    <Box marginBottom={7} style={{textAlign: 'center', width: '95%'}}>
      <Typography color={warning? "secondary" : "primary"} variant="h6">{title}</Typography>
      {children}
    </Box>
  );
}

export default function Modal({ mov, closeMovModal, set_referenciaFeedback, set_cancelMovFeedback, updateMovList }) {

  // break down variables
  const id = mov['id'];
  const tipo_mov = mov['tipo_mov'];
  const nomeDeposito = mov['deposito']['nome'];
  const ordens = mov['ordens'];
  const atualizacoes = mov['atualizacoes'];

  return (
    <FullscreenModal
      appBarTitle={`Movimentação ${id}`}
      closeModalHandler={closeMovModal}
    >

      {/* Depósito e Tipo de Movimentação */}

      <Box margin={3}>
        <Typography variant="h5" component="span">
          {nomeDeposito + ' - '}
          <span> </span>
          <Typography variant="h5" color={tipo_mov==='entrada'? "primary" : "secondary"} component="span">
            {tipo_mov==='entrada'? 'Entrada' : 'Saída'}
          </Typography>
        </Typography>
      </Box>


      <TableWrapper title="Ordens">
        <Ordens ordens={ordens} />
      </TableWrapper>

      <TableWrapper title="Quantidades">
        <Quantidades ordens={ordens} tipo_mov={tipo_mov} />
      </TableWrapper>

      <TableWrapper title="Atualizações">
        <Atualizacoes atualizacoes={atualizacoes} />
      </TableWrapper>

      {mov['status'] === 'cancelada'?
        null :
        <TableWrapper title="Referências">
          <Referencias
            originalOrdens={ordens}
            set_referenciaFeedback={set_referenciaFeedback}  
            closeMovModal={closeMovModal}
            updateMovList={updateMovList}
          />
        </TableWrapper>
      }

      {mov['status'] === 'cancelada'?
        null :
        <TableWrapper
          title="Cancelar Movimentação"
          warning={true}
        >
          <CancelarMov
            mov_id={id}
            set_cancelMovFeedback={set_cancelMovFeedback}
            closeMovModal={closeMovModal}
            updateMovList={updateMovList}
          />
        </TableWrapper>
      }

    </FullscreenModal>
  );

}
