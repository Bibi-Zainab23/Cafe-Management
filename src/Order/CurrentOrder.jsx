import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { calculateTotal } from "./Helpers";

export default function CurrentOrder({ newOrder, setNewOrder, menuDishes }) {
  const handleRemoveItem = (idx) => {
    const updatedItems = newOrder.items.filter((_, i) => i !== idx);
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  return (
    newOrder.items.length > 0 && (
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
          <strong>Total Amount:</strong> ₹{calculateTotal(newOrder.items, menuDishes)}
        </Typography>
      </Box>
    )
  );
}