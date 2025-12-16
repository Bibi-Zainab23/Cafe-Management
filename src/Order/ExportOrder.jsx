import React from "react";
import { Button } from "@mui/material";
import { calculateTotal } from "./Helpers";

export default function ExportOrders({ orders }) {
  const handleExport = () => {
    if (!orders || orders.length === 0) {
      alert("No orders to export!");
      return;
    }

    // Build CSV header
    let csvContent = "Customer,Items,Status\n";

    // Add rows
    orders.forEach(order => {
      const items = order.items.map(i => `${i.dish} x${i.quantity}`).join(" | ");
      csvContent += `${order.customer},"${items}",${order.status}\n`;
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleExport} sx={{ mb: 0 , mt: 2}}>
      Export Orders (CSV)
    </Button>
  );
}