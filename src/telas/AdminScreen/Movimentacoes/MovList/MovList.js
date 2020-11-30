import React from 'react'
import Typography from '@material-ui/core/Typography';
import filterMovs from './filterMovs';
import MovModal from './MovModal/MovModal';
import List from '@material-ui/core/List';
import MovItem from './MovItem/MovItem';
import useStyles from './movListStyles';

const MovList = ({ movimentacoes, filtros, set_modal, set_referenciaFeedback, set_cancelMovFeedback}) => {
  const classes = useStyles();

  if (movimentacoes.length === 0) return <NenhumaMovMessage />;

  const filteredMovs = filterMovs(movimentacoes, filtros);
  
  if (filteredMovs.length === 0) return <NenhumaMovMessage />;

  const movs = filteredMovs.map(mov => {
    return (
      <MovItem
        key={mov['id']}
        referencia={mov['referencia']}
        ajuste={mov['ajuste']}
        nomeDeposito={mov.deposito['nome']}
        tipo_mov={mov['tipo_mov']}
        status={mov['status']}
        data_ultima_atualizacao={mov['data_ultima_atualizacao']}
        openModal={() => set_modal(
          <MovModal
            mov={mov}
            closeMovModal={() => set_modal(null)}
            set_referenciaFeedback={set_referenciaFeedback}
            set_cancelMovFeedback={set_cancelMovFeedback}
          />
        )}
      />
    );
  
  });

  return (
    <List
      className={classes.listContainer}
      disablePadding={true}
    >
      {movs}
    </List>
  );
}

export default MovList;

const NenhumaMovMessage = () => {
  return (
    <Typography style={{textAlign: 'center'}} color="secondary">
      Nenhuma movimentação encontrada
    </Typography>
  );
}