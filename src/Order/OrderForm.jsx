import React from "react";
import { Box, TextField, Select, MenuItem, Button } from "@mui/material";

export default function OrderForm({
  newOrder,
  setNewOrder,
  currentDish,
  setCurrentDish,
  quantity,
  setQuantity,
  menuDishes,
  handleAddDishToOrder
}) {
  return (
    <>
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "nowrap", alignItems: "center" }}>
        <TextField
          label="Customer Name"
          value={newOrder.customer}
          onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
          size="small"
        />
      
        <Select
          value={currentDish}
          onChange={(e) => setCurrentDish(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
          size="small"
        >
          <MenuItem value="">
            <em>Select Dish</em>
          </MenuItem>
          {menuDishes.map((dish, index) => (
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
          size="small"
        />
        <Button variant="contained" onClick={handleAddDishToOrder} size="small">
          Add Dish
        </Button>
      </Box>
    </>
  );
}