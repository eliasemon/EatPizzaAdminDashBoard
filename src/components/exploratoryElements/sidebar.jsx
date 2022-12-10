import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const categories = [
    {
      id: 1,
      title: "Dashboard",
      link: "/",
      icon: <DashboardIcon />,
    },
    {
      id: 2,
      title: "Current Orders",
      link: "/currentorders",
      icon: <DashboardIcon />,
    },
    {
      id: 3,
      title: "Orders History",
      link: "/orderhistory",
      icon: <ListIcon />,
    },
    {
      id: 4,
      title: "All Items",
      link: "/items",
      icon: <DashboardIcon />,
    },
    {
      id: 5,
      title: "Create Items",
      link: "/createitem",
      icon: <DashboardIcon />,
    },
    {
      id: 6,
      title: "Total User",
      link: "users",
      icon: <ListAltIcon />,
    },
    {
      id: 7,
      title: "Create Categories",
      link: "/categories",
      icon: <ListAltIcon />,
    },
    {
      id: 8,
      title: "Create AddOns",
      link: "/addons",
      icon: <SettingsIcon />,
    },
    {
      id: 9,
      title: "Settings",
      link: "/settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Box bgcolor="secondary.deep" sx={{ width: "15%", height: "100%" }}>
      <Box bgcolor="secondary.deep" sx={{ width: "100%", maxWidth: 360 }}>
        <List component="nav" aria-label="main  folders">
          {categories.map((item) => (
            <ListItemButton
              // selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
              key={item.id}
              sx={{
                margin: "15px",
                padding: "5px",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "primary.main",
                  transitionDuration: ".5s",
                },
              }}
            >
              <Link
                to={item.link}
                style={{ display: "flex", textDecoration: "none" }}
              >
                <ListItemIcon sx={{ color: "secondary.text" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ color: "secondary.text" }}
                />
              </Link>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};
export default SideBar;
