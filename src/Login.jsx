import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // clear error when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = savedUsers.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (matchedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      navigate("/main");
    } else {
      setErrors({ ...errors, password: "Email or password is incorrect" });
    }
  };

  return (
    <Box sx={{ width: 300, margin: "auto", mt: 10, p: 3, boxShadow: 3 }}>
      <Typography variant="h5" align="center">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
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
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
          Login
        </Button>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don’t have an account?{" "}
        <Button
          variant="text"
          onClick={() => navigate("/signup")}
          sx={{ textTransform: "none" }}
        >
          Signup
        </Button>
      </Typography>
    </Box>
  );
}