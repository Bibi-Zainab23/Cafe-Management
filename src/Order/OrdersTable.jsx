import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Select, MenuItem } from "@mui/material";
import { calculateTotal } from "./Helpers";

export default function OrdersTable({ orders, menuDishes, handleStatusChange, handleDelete }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><strong>#</strong></TableCell> 
          <TableCell><strong>Customer</strong></TableCell>
          <TableCell><strong>Items</strong></TableCell>
          <TableCell><strong>Status</strong></TableCell>
          <TableCell><strong>Amount (₹)</strong></TableCell>
          <TableCell><strong>Actions</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order, index) => {
          const total = calculateTotal(order.items, menuDishes);
          return (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell> 
              <TableCell>{order.customer}</TableCell>
              <TableCell>
                {order.items.map((item, idx) => (
                  <div key={idx}>{item.dish} × {item.quantity}</div>
                ))}
              </TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                  sx={{ minWidth: 120 }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Preparing">Preparing</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </TableCell>
              <TableCell>₹{total}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}