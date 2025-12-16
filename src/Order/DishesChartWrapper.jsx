// src/components/DishesChartWrapper.jsx
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Charts from "./Charts";

export default function DishesChartWrapper() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <>
      <Header />
      <Charts orders={orders} />
    </>
  );
}