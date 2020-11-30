import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Ordens = ({ordens}) => {

  const entries = ordens.map(ordem => {

    return (
      <TableRow key={ordem['id']}>
        <TableCell align="center">{ordem['qtd']}</TableCell>
        <TableCell align="center">{ordem['mercadoria']['unidade']}</TableCell>
        <TableCell align="center">{ordem['mercadoria']['nome']}</TableCell>
      </TableRow>  
    );
  });
  

  return (
    <Table>

      <TableHead>
        <TableRow>
          <TableCell align="center">Volumes</TableCell>
          <TableCell align="center">Unidade</TableCell>
          <TableCell align="center">Mercadoria</TableCell>          
        </TableRow>
      </TableHead>

      <TableBody>
        {entries}
      </TableBody>

    </Table>
  );
}

export default Ordens;
