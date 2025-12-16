import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Charts({ orders }) {
  // Count dish quantities across all orders
  const dishCounts = {};
  if (Array.isArray(orders)) {
    orders.forEach(order => {
      if (Array.isArray(order.items)) {
        order.items.forEach(item => {
          dishCounts[item.dish] = (dishCounts[item.dish] || 0) + item.quantity;
        });
      }
    });
  }

  const labels = Object.keys(dishCounts);
  const values = Object.values(dishCounts);

  // Bar chart data
  const barData = {
    labels,
    datasets: [
      {
        label: "Quantity Sold",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }
    ]
  };

  // Pie chart data
  const pieData = {
    labels,
    datasets: [
      {
        label: "Dish Share",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)"
        ]
      }
    ]
  };

  return (
    <div style={{ width: "500px", margin: "20px auto" }}>
      <h3 style={{ textAlign: "center" }}>Top Selling Dishes</h3>

      {/* Bar Chart */}
      <Bar
        data={barData}
        options={{
          responsive: true,
          plugins: { legend: { display: false }, title: { display: true, text: "Dish Quantities" } }
        }}
      />

      {/* Pie Chart */}
      <Pie
        data={pieData}
        options={{
          responsive: true,
          plugins: { legend: { position: "right" }, title: { display: true, text: "Dish Share (%)" } }
        }}
      />
    </div>
  );
}