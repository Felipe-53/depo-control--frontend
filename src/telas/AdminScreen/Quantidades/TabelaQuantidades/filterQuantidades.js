// TODO: impprove this function, please

export default function filterQuantidades ({quantidades, mercadorias, depositos, filtro, option}) {

  let tableData;

  if (option !== '') {

    let filtered_quantidades = quantidades.filter((quantidade) => {
      if (filtro === 'deposito') {
        return quantidade['deposito_id'] === option['id'];
      }
      if (filtro === 'mercadoria') {
        return quantidade['mercadoria_id'] === option['id'];
      }
    });

    tableData = filtered_quantidades.map((quantidade) => {
      
      if (filtro === 'deposito') {

        let nomeMercadoria = mercadorias.find((mercadoria) => {
          return quantidade['mercadoria_id'] === mercadoria['id'];
        })['nome'];

        return {
          nome: nomeMercadoria,
          qtd: quantidade['qtd']
        }
      }

      if (filtro === 'mercadoria') {

        let nomeDeposito = depositos.find((deposito) => {
          return quantidade['deposito_id'] === deposito['id'];
        })['nome'];

        return {
          nome: nomeDeposito,
          qtd: quantidade['qtd']
        }
      }
    });

    return tableData;
  }

  return null;
}