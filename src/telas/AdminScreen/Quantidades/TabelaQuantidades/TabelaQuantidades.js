import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import filterQuantidades from './filterQuantidades';

const TabelaQuantidades = ({ quantidades, mercadorias, depositos, filtro, option }) => {

  const tableData = filterQuantidades({
    quantidades: quantidades,
    depositos: depositos,
    mercadorias: mercadorias,
    filtro: filtro,
    option: option
  })

  return tableData? (
    <TableContainer component={Paper}>
      <Table>
        
        <TableHead>
          <TableRow>
            <TableCell align="center">{filtro==='deposito'? 'Mercadoria' : 'Depósito'}</TableCell>
            <TableCell align="center">Quantidade</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData.map((data) => (
            <TableRow key={data['nome']}>
              <TableCell align="center">{data['nome']}</TableCell>
              <TableCell align="center">{data['qtd']}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  ) : null;
}

export default TabelaQuantidades;
