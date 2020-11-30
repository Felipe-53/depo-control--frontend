import React from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Ordem from './Ordem/Ordem';

const Ordens = ({ ordens, removeOrdemHandler }) => {

  if (ordens.length !== 0) {
    const mappedOrdens = ordens.map((ordem) => {
      return (
        <Ordem
          key={ordem.id}
          qtd={ordem.qtd}
          unidade={ordem.unidade}
          mercadoria={ordem.nomeMercadoria}
          removeOrdemHandler={() => removeOrdemHandler(ordem['id'])}
        />
      );
    });

    return (
      <List style={{width: '100%'}}>
        {mappedOrdens}
      </List>
    );
    
  }
  
  return (
  <Typography
    color="primary"
    style={{marginTop: '10%', textAlign: 'center'}}
  >
    Adicione ordens!
  </Typography>
  );

}

export default Ordens;
