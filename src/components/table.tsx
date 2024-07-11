// src/components/SimpleTable.tsx

import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface TableProps {
  headers: string[];
  rows: RowData[];
  pendingRows?: RowData[];
}

export interface RowData {
  [key: string]: string | number;
}


const CustomTable: React.FC<TableProps> = ({ headers, rows, pendingRows = [] }) => {
  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {pendingRows.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, cellIndex) => (
                  <TableCell style={{backgroundColor: '#ffbcc4'}} key={cellIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
            {rows.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, cellIndex) => (
                  <TableCell key={cellIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomTable;
