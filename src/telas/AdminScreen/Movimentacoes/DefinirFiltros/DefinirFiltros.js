import React, { useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import DropdownMenu from '../../../../components/DropdownMenu/DropdownMenu';
import { fetchGetEndpoint } from '../../../../utils/fetchEndpoints';

const Filtros = ({set_filtros}) => {

  const [mercadoriasOptions, set_mercadoriasOptions] = useState([]);
  const [chosenMercadoria, set_chosenMercadoria] = useState('');

  /* Get filtering options */
  useEffect(() => {
    fetchGetEndpoint('/api/mercadorias')
    .then(mercadorias => {
      mercadorias.push('');
      set_mercadoriasOptions(mercadorias);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  /* trigger filtering */
  useEffect(() => {
    set_filtros(prevFiltros => {
      let updatedFiltros = {...prevFiltros};
      updatedFiltros['mercadoria_id'] = chosenMercadoria['id'];
      return updatedFiltros;
    })
  }, [chosenMercadoria]);

  return (
    <>
      <Typography
        style={{margin: '30px 0'}}
        variant="h6"
        color="primary"
      >
        Filtros
      </Typography>

      <DropdownMenu
        label="Mercadoria"
        value={chosenMercadoria}
        set_value={set_chosenMercadoria}
        options={mercadoriasOptions}
      />
    </>
  );
}

export default Filtros
