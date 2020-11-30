export default function filterMovs (movs, filter) {
  
  /* Destructure filter object */
  const {mercadoria_id, deposito_id} = filter;

  /* If filter is an empty obj, default to return
  the movs as they came */
  let filteredMovs = movs;

  /* Filter by mercadoria, if provided */
  if (mercadoria_id) {
    filteredMovs = movs.filter(mov => {

      let ordens = mov['ordens'];

      for (let i = 0; i < ordens.length; i++) {
        if (ordens[i].mercadoria.id === mercadoria_id) {
          return true;
        }
      }

      return false;
    });
  }

  /* Filter by deposito. Notice thar these filter operations are nested. */
  if (deposito_id) {

    filteredMovs = filteredMovs.filter(mov => {
      return mov['deposito'].id === deposito_id;
    });
  
  }

  return filteredMovs;

}
