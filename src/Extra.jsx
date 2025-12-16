import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "./Header";

export default function Extra() {
  const [orders, setOrders] = useState([]);
  const [menuDishes, setMenuDishes] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    table: "",
    items: [],
    status: "Pending",
  });
  const [currentDish, setCurrentDish] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);

    const savedMenu = JSON.parse(localStorage.getItem("dishes")) || [];
    setMenuDishes(savedMenu);
  }, []);

  const saveOrders = (updatedOrders) => {
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const handleAddDishToOrder = () => {
    if (!currentDish || quantity <= 0) {
      alert("Select a dish and valid quantity!");
      return;
    }
    const updatedItems = [...newOrder.items, { dish: currentDish, quantity }];
    setNewOrder({ ...newOrder, items: updatedItems });
    setCurrentDish("");
    setQuantity(1);
  };

  const handleRemoveItem = (idx) => {
    const updatedItems = newOrder.items.filter((_, i) => i !== idx);
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const handleAddOrder = () => {
    if (!newOrder.customer || !newOrder.table || newOrder.items.length === 0) {
      alert("Please fill all fields and add at least one dish!");
      return;
    }
    const updatedOrders = [...orders, newOrder];
    saveOrders(updatedOrders);
    setNewOrder({ customer: "", table: "", items: [], status: "Pending" });
  };

  const handleStatusChange = (index, status) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = status;
    saveOrders(updatedOrders);
  };

  const handleDelete = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    saveOrders(updatedOrders);
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
      const dish = menuDishes.find((d) => d.name === item.dish);
      const price = dish ? dish.price : 0;
      return sum + price * item.quantity;
    }, 0);
  };

  return (
    <>
      <Header />
      <Box sx={{ width: "90%", margin: "auto", mt: 5 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Order Management
          </Typography>

          {/* Add new order form */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
            <TextField
              label="Customer Name"
              value={newOrder.customer}
              onChange={(e) =>
                setNewOrder({ ...newOrder, customer: e.target.value })
              }
            />
            <TextField
              label="Table Number"
              value={newOrder.table}
              onChange={(e) =>
                setNewOrder({ ...newOrder, table: e.target.value })
              }
            />
          </Box>

          {/* Dish selection */}
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <Select
              value={currentDish}
              onChange={(e) => setCurrentDish(e.target.value)}
              displayEmpty
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">
                <em>Select Dish</em>
              </MenuItem>
              {Array.isArray(menuDishes) &&
                menuDishes.map((dish, index) => (
                  <MenuItem key={index} value={dish.name}>
                    {dish.name} (₹{dish.price})
                  </MenuItem>
                ))}
            </Select>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              sx={{ width: 100 }}
            />
            <Button variant="contained" onClick={handleAddDishToOrder}>
              Add Dish
            </Button>
          </Box>

          {/* Show current order items */}
          {newOrder.items.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">Current Order Items:</Typography>
              <ul>
                {newOrder.items.map((item, idx) => (
                  <li key={idx}>
                    {item.dish} × {item.quantity}
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleRemoveItem(idx)}
                      sx={{ ml: 1 }}
                    >
                      ❌
                    </Button>
                  </li>
                ))}
              </ul>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Total Amount:</strong> ₹{calculateTotal(newOrder.items)}
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            color="success"
            onClick={handleAddOrder}
            sx={{ mb: 3 }}
          >
            Save Order
          </Button>

          {/* Orders table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Customer</strong>
                </TableCell>
                <TableCell>
                  <strong>Table</strong>
                </TableCell>
                <TableCell>
                  <strong>Items</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Amount (₹)</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(orders) &&
                orders.map((order, index) => {
                  const total = calculateTotal(order.items);
                  return (
                    <TableRow key={index}>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.table}</TableCell>
                      <TableCell>
                        {Array.isArray(order.items) &&
                          order.items.map((item, idx) => (
                            <div key={idx}>
                              {item.dish} × {item.quantity}
                            </div>
                          ))}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(index, e.target.value)
                          }
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
        </Paper>
      </Box>
    </>
  );
}
