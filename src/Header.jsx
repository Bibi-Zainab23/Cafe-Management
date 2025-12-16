import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  useMediaQuery,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/"); 
  };

  const navItems = [
    { label: "Main", path: "/main", icon: <HomeIcon /> },
    { label: "Menu", path: "/menu", icon: <RestaurantMenuIcon /> },
    { label: "Charts", path: "/charts", icon: <BarChartIcon /> },
    { label: "Profile", path: "/profile", icon: <PersonIcon /> },
    { label: "All Users", path: "/allusers", icon: <GroupIcon /> },
  ];

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={3}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1 }}
          >
            Zainab’s Café
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box sx={{ width: 250 }}>
                  <List>
                    {navItems.map((item) => (
                      <ListItemButton
                        key={item.label}
                        onClick={() => {
                          navigate(item.path);
                          setDrawerOpen(false);
                        }}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    ))}
                  </List>
                  <Divider />
                  <List>
                    <ListItemButton onClick={() => setConfirmOpen(true)}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                  sx={{ textTransform: "none", fontWeight: 500 }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<LogoutIcon />}
                sx={{
                  ml: 2,
                  textTransform: "none",
      
                  backgroundColor: "#c30010",
                  borderColor: "red",
                  
                }}
                onClick={() => setConfirmOpen(true)}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setConfirmOpen(false);
              handleLogout();
            }}
            color="error"
            variant="contained"
          >
            Yes, Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}