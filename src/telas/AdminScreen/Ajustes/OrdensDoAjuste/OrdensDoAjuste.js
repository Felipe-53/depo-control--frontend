import React from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Ordem from './OrdemAjuste/OrdemAjuste';

const OrdensDoAjuste = ({ ordens, set_ordens }) => {

  const removeOrdemHandler = (id) => {
    set_ordens(prevOrdens => {
      let updatedOrdens = prevOrdens.filter(ordem => {
        return ordem.id !== id;
      });
      return updatedOrdens;
    });
  }

  return (
    <>
      <Typography variant="h6" color="primary" style={{margin: '60px 0 20px 0'}}>
        Ordens
      </Typography>

      <List style={{width: '100%', marginBottom: '50px'}}>
        {ordens.map(ordem => {
          return (
            <Ordem
              key={ordem.id}
              qtd={ordem.qtd}
              unidade={ordem.unidade}
              mercadoria={ordem.nomeMercadoria}
              removeOrdemHandler={() => removeOrdemHandler(ordem['id'])}
            />
          );
        })}
      </List>
    </>
  );
}

export default OrdensDoAjuste;
