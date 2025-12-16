import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import Header from "../Header";
import OrderForm from "./OrderForm";
import CurrentOrder from "./CurrentOrder";
import OrdersTable from "./OrdersTable";
import ExportOrders from "./ExportOrder";
import SummaryCards from "./SummaryCards";

export default function MainPage() {
  const [orders, setOrders] = useState([]);
  const [menuDishes, setMenuDishes] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    items: [],
    status: "Pending"
  });
  const [currentDish, setCurrentDish] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

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

  const handleAddOrder = () => {
    if (!newOrder.customer || newOrder.items.length === 0) {
      alert("Please fill all fields and add at least one dish!");
      return;
    }
   
    const orderWithDate = {
      ...newOrder,
      date: new Date().toISOString().split("T")[0] // YYYY-MM-DD
    };
    const updatedOrders = [...orders, orderWithDate];
    saveOrders(updatedOrders);
    setNewOrder({ customer: "", items: [], status: "Pending" });
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

  return (
    <>
      <Header />
      <ExportOrders orders={orders} />

      <Box sx={{ width: "90%", margin: "auto", mt: 2 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Order Management
          </Typography>

          <SummaryCards
            orders={orders}
            menuDishes={menuDishes}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <OrderForm
            newOrder={newOrder}
            setNewOrder={setNewOrder}
            currentDish={currentDish}
            setCurrentDish={setCurrentDish}
            quantity={quantity}
            setQuantity={setQuantity}
            menuDishes={menuDishes}
            handleAddDishToOrder={handleAddDishToOrder}
          />

          <CurrentOrder
            newOrder={newOrder}
            setNewOrder={setNewOrder}
            menuDishes={menuDishes}
          />

          <Button
            variant="contained"
            color="success"
            onClick={handleAddOrder}
            sx={{ mb: 3 }}
          >
            Save Order
          </Button>

          <OrdersTable
            orders={orders}
            menuDishes={menuDishes}
            handleStatusChange={handleStatusChange}
            handleDelete={handleDelete}
          />
        </Paper>
      </Box>
    </>
  );
}