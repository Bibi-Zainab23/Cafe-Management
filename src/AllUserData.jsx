// src/components/AllUserData.jsx
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import Header from "./Header";

export default function AllUserData() {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", phone: "", email: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const saveUsers = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  // Ask for confirmation before delete
  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setOpenConfirm(true);
  };

  // Confirm deletion
  const handleDeleteConfirmed = () => {
    const updatedUsers = users.filter((_, i) => i !== deleteIndex);
    saveUsers(updatedUsers);
    setOpenConfirm(false);
    setDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
    setDeleteIndex(null);
  };

  
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditForm(users[index]);
  };

  // Handle edit form changes
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save edited user
  const handleSave = () => {
    const updatedUsers = [...users];
    updatedUsers[editingIndex] = editForm;
    saveUsers(updatedUsers);
    setEditingIndex(null);
  };

  // Filter users by search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <Box sx={{ width: 700, margin: "auto", mt: 10 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            All Registered Users
          </Typography>

          {/* Search bar */}
          <Box sx={{ display: "flex", mb: 2 }}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          {filteredUsers.length === 0 ? (
            <Typography align="center" color="error">
              No users found.
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {editingIndex === index ? (
                        <TextField
                          name="name"
                          value={editForm.name}
                          onChange={handleChange}
                        />
                      ) : (
                        user.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingIndex === index ? (
                        <TextField
                          name="phone"
                          value={editForm.phone}
                          onChange={handleChange}
                        />
                      ) : (
                        user.phone
                      )}
                    </TableCell>
                    <TableCell>
                      {editingIndex === index ? (
                        <TextField
                          name="email"
                          value={editForm.email}
                          onChange={handleChange}
                        />
                      ) : (
                        user.email
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
                            onClick={() => handleDeleteClick(index)}
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
          )}
        </Paper>
      </Box>

      <Dialog open={openConfirm} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}