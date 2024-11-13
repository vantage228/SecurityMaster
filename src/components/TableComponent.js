import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import EditForm from './EditForm';

const TableComponent = ({ securities }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEdit = (security) => setSelectedRow(security);
  const handleDelete = (id) => {
    // Mark as inactive in DB
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Close Price</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {securities.map((sec) => (
            <TableRow key={sec.id}>
              <TableCell>{sec.name}</TableCell>
              <TableCell>{sec.description}</TableCell>
              <TableCell align="right" style={{ color: sec.closePrice < 0 ? 'red' : 'green' }}>
                ${sec.closePrice.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => handleEdit(sec)}>Edit</Button>
                <Button onClick={() => handleDelete(sec.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedRow && <EditForm security={selectedRow} />}
    </>
  );
};

export default TableComponent;
