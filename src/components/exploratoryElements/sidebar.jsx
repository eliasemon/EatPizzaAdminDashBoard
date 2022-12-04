// import { Box } from '@mui/system'
import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";
const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const categories = [
    {
      id: 1,
      title: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      id: 2,
      title: "Create Order",
      icon: <DashboardIcon />,
    },
    {
      id: 3,
      title: "Orders History",
      icon: <ListIcon />,
    },
    {
      id: 4,
      title: "Total User",
      icon: <ListAltIcon />,
    },
    {
      id: 5,
      title: "Product Categories",
      icon: <ListAltIcon />,
    },
    {
      id: 6,
      title: "Create AddOns",
      icon: <SettingsIcon />,
    },
    {
      id: 7,
      title: "Settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Box bgcolor="secondary.deep" sx={{ width: "100%", height: "100%" }}>
      <Box bgcolor="secondary.deep" sx={{ width: "100%", maxWidth: 360 }}>
        <List component="nav" aria-label="main  folders">
          {categories.map((item) => (
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
              key={item.id}
              sx={{
                "&:hover": {
                  backgroundColor: "primary.main",
                  transitionDuration: ".5s",
                },
              }}
            >
              <ListItemIcon sx={{ color: "secondary.text" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ color: "secondary.text" }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};
export default SideBar;
