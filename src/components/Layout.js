import React, { useEffect, useState } from "react";
import logo from "../illustration-circle-stamp-banner-vector_53876-27183-removebg-preview.png";
import {
  Avatar,
  Menu,
  MenuItem,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import CallIcon from "@mui/icons-material/Call";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";

const drawerWidth = 200;

const Layout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [activeItem, setActiveItem] = useState("");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const navigateArray = ["/home", "/employee", "/contactus"];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/userRead", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Fetched user data:', response.data); // Debugging log
          // setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (text, path) => {
    setActiveItem(text);
    navigate(path);
  };

  const icons = [<DashboardIcon />, <InfoIcon />, <CallIcon />];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src={logo}
              alt="Logo"
              onClick={() => navigate("/home")}
              style={{
                height: "50px",
                width: "auto",
                opacity: 1,
                cursor: "pointer",
              }}
            />

            {user && (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <IconButton size="large" onClick={handleMenu}>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {user.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                  <span style={{ color: "white", fontFamily: "serif" }}>
                    &nbsp;
                    {user.firstName.charAt(0).toUpperCase() +
                      user.firstName.slice(1)}
                  </span>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Dashboard", "Employee", "Contact Us"].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                onClick={() => handleItemClick(text, navigateArray[index])}
                selected={activeItem === text}
              >
                <ListItemButton>
                  <ListItemIcon>{icons[index]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Layout;
