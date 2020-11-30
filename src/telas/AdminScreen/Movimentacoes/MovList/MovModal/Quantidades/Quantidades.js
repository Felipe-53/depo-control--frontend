import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Quantidades = ({ordens, tipo_mov}) => {

  const sign = {
    'entrada': '+',
    'saida': '-',
  }

  const color = {
    'entrada': 'rgb(0, 204, 0)',
    'saida': 'rgb(204, 0, 0)',
  }

  const entries = ordens.map(ordem => {

    return (
      <TableRow key={ordem['id']}>
        <TableCell align="center">{ordem['mercadoria']['nome']}</TableCell>
        <TableCell align="center">{ordem['antes']}</TableCell>
        <TableCell style={{color: color[tipo_mov]}}  align="center">
            {sign[tipo_mov] + ordem['qtd']}
        </TableCell>
        <TableCell align="center">{ordem['depois']}</TableCell>
      </TableRow>  
    );
  
  });
  

  return (
    <Table>

      <TableHead>
        <TableRow>
          <TableCell align="center">Mercadoria</TableCell>
          <TableCell align="center">Antes</TableCell>
          <TableCell align="center">Qtd</TableCell>
          <TableCell align="center">Depois</TableCell>          
        </TableRow>
      </TableHead>

      <TableBody>
        {entries}
      </TableBody>

    </Table>
  );
}

export default Quantidades;
