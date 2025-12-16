// src/components/Profile.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import Header from "./Header";

export default function Profile() {
  const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];

  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState(savedUser || { name: "", phone: "", email: "" });
  const [openConfirm, setOpenConfirm] = useState(false);

  if (!savedUser) {
    return (
      <Box sx={{ width: 400, margin: "auto", mt: 10 }}>
        <Typography variant="h6" align="center" color="error">
          No user data found. Please login first.
        </Typography>
      </Box>
    );
  }

  // Handle form changes
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save edited profile
  const handleSave = () => {
    localStorage.setItem("loggedInUser", JSON.stringify(editForm));

    const updatedUsers = allUsers.map((u) =>
      u.email === savedUser.email ? editForm : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setEditing(false);
  };

  // Confirmed delete
  const handleDeleteConfirmed = () => {
    const updatedUsers = allUsers.filter((u) => u.email !== savedUser.email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.removeItem("loggedInUser");

    setOpenConfirm(false);
    window.location.reload(); // refresh to show "No user data found"
  };

  return (
    <>
      <Header />
      <Box sx={{ width: 400, margin: "auto", mt: 10 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Your Profile
          </Typography>

          {editing ? (
            <>
              <TextField
                fullWidth
                margin="dense"
                label="Name"
                name="name"
                value={editForm.name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Phone"
                name="phone"
                value={editForm.phone}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Email"
                name="email"
                value={editForm.email}
                onChange={handleChange}
              />

              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" color="success" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="body1"><strong>Name:</strong> {savedUser.name}</Typography>
              <Typography variant="body1"><strong>Phone:</strong> {savedUser.phone}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {savedUser.email}</Typography>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" onClick={() => setEditing(true)}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => setOpenConfirm(true)}>
                  Delete My Profile
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete your profile?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="secondary">
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