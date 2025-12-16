// src/components/Order/SummaryCards.jsx
import React, { useMemo } from "react";
import { Box, Paper, Typography, TextField } from "@mui/material";

export default function SummaryCards({ orders, menuDishes, selectedDate, setSelectedDate }) {
  // Filter orders by selected date
  const filteredOrders = orders.filter(order => order.date === selectedDate);

  const { totalOrders, totalRevenue, topDish, pendingCount } = useMemo(() => {
    let totalOrders = filteredOrders.length;
    let totalRevenue = 0;
    let dishCounts = {};
    let pendingCount = 0;

    filteredOrders.forEach(order => {
      if (order.status === "Pending") pendingCount++;
      order.items.forEach(item => {
        const dish = menuDishes.find(d => d.name === item.dish);
        const price = dish ? dish.price : 0;
        totalRevenue += price * item.quantity;
        dishCounts[item.dish] = (dishCounts[item.dish] || 0) + item.quantity;
      });
    });

    let topDish = "N/A";
    if (Object.keys(dishCounts).length > 0) {
      topDish = Object.entries(dishCounts).sort((a, b) => b[1] - a[1])[0][0];
    }

    return { totalOrders, totalRevenue, topDish, pendingCount };
  }, [filteredOrders, menuDishes]);

  return (
    <>
      {/* Date selector */}
      <Box sx={{ mb: 1 }}>
        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          label="Select Date"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* Summary cards */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <Paper sx={{ p: 2, flex: 1 }} >
          <Typography variant="subtitle2">Today's Total Orders</Typography>
          <Typography variant="h6">{totalOrders}</Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1}}>
          <Typography variant="subtitle2">Revenue</Typography>
          <Typography variant="h6">₹{totalRevenue}</Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="subtitle2">Top Dish</Typography>
          <Typography variant="h6">{topDish}</Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="subtitle2">Pending Orders</Typography>
          <Typography variant="h6">{pendingCount}</Typography>
        </Paper>
      </Box>
    </>
  );
}