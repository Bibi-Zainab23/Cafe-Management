import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({ phone: "", email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = { phone: "", email: "" };
    let isValid = true;

    // Phone validation: only digits, exactly 10
    if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "Phone number must be exactly 10 digits";
      isValid = false;
    }

    // Email validation: basic regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Enter a valid email address";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password
    };

    users.push(newUser);

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! You can now login.");
    navigate("/");
  };

  return (
    <Box sx={{ width: 350, margin: "auto", mt: 0, p: 3, boxShadow: 3 }}>
      <Typography variant="h5" align="center">Signup</Typography>
      <form onSubmit={handleSignup}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />

        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          fullWidth
          margin="normal"
          required
          value={formData.phone}
          onChange={handleChange}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          inputProps={{ maxLength: 10 }} 
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          required
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />

        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />

        <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
          Signup
        </Button>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Button
          variant="text"
          onClick={() => navigate("/")}
          sx={{ textTransform: "none" }}
        >
          Login
        </Button>
      </Typography>
    </Box>
  );
}