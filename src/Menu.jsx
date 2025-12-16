// src/components/Menu.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem
} from "@mui/material";
import Header from "./Header";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({ name: "", price: "", category: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", category: "" });

  const categories = ["☕Beverages", "🥪Snacks & Light Meals", "🍕 Fast Bites", "🍰Desserts"];

  // Load dishes from localStorage
  useEffect(() => {
    const savedDishes = JSON.parse(localStorage.getItem("dishes")) || [];
    setDishes(savedDishes);
  }, []);

  const saveDishes = (updatedDishes) => {
    localStorage.setItem("dishes", JSON.stringify(updatedDishes));
    setDishes(updatedDishes);
  };

  const handleAddDish = () => {
    if (!newDish.name || !newDish.price || !newDish.category) {
      alert("Please fill all fields!");
      return;
    }
    const updatedDishes = [...dishes, newDish];
    saveDishes(updatedDishes);
    setNewDish({ name: "", price: "", category: "" });
  };

  const handleDelete = (index) => {
    const updatedDishes = dishes.filter((_, i) => i !== index);
    saveDishes(updatedDishes);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditForm(dishes[index]);
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save edited dish
  const handleSave = () => {
    const updatedDishes = [...dishes];
    updatedDishes[editingIndex] = editForm;
    saveDishes(updatedDishes);
    setEditingIndex(null);
  };

  return (
    <>
      <Header />
      <Box sx={{ width: "90%", margin: "auto", mt: 5 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Menu Management
          </Typography>

          {/* Add new dish form */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
            <TextField
              label="Name"
              name="name"
              value={newDish.name}
              onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
              size="small"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={newDish.price}
              onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
              size="small"
            />
            <Select
              name="category"
              value={newDish.category}
              onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
              displayEmpty
              sx={{ minWidth: 150 }}
              size="small"
            >
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="success" onClick={handleAddDish}  size="small">
              Add Dish
            </Button>
          </Box>

          {/* Dishes table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Price (₹)</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dishes.map((dish, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {editingIndex === index ? (
                      <TextField
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                      />
                    ) : (
                      dish.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <TextField
                        name="price"
                        type="number"
                        value={editForm.price}
                        onChange={handleChange}
                      />
                    ) : (
                      dish.price
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <Select
                        name="category"
                        value={editForm.category}
                        onChange={(e) =>
                          setEditForm({ ...editForm, category: e.target.value })
                        }
                        sx={{ minWidth: 150 }}
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      dish.category
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={handleSave}
                          sx={{ mr: 1 }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() => setEditingIndex(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </>
  );
}