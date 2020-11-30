import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const mapping = {
  'solicitacao': 'Solicitada',
  'confirmacao': 'Confirmada',
  'cancelamento': 'Cancelada',
  'ajuste': 'Ajuste',
}

const Atualizacoes = ({atualizacoes}) => {

  const entries = atualizacoes.map((atualizacao, index) => {
    return (
      <TableRow key={index}>
        <TableCell align="center">{atualizacao['usuario']}</TableCell>
        <TableCell align="center">{mapping[atualizacao['tipo']]}</TableCell>
        <TableCell align="center">{atualizacao['datetime']}</TableCell>
      </TableRow>
    );
  });
  
  return (
    <Table>

      <TableHead>
        <TableRow>
          <TableCell align="center">Usuário</TableCell>
          <TableCell align="center">Status</TableCell>
          <TableCell align="center">Data</TableCell>          
        </TableRow>
      </TableHead>

      <TableBody>
        {entries}
      </TableBody>

    </Table>
  )
}

export default Atualizacoes;
