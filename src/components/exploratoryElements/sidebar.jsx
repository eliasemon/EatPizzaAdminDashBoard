import React, { useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import categories from "./../../constants/categoriesList";
import {
  SidebarContainer,
  ListButton,
  StyledLink,
} from "./ExploratoryElements.styled";
import { useLocation } from "react-router-dom";

const SideBar = () => {
 
  const  location = useLocation();
  console.log(location)


  return (
    <SidebarContainer>
      {categories.map((item) => (
        <StyledLink key={item.id} to={item.link ? item.link : "/"}>
          <ListButton
            selected={location.pathname.includes(item.link)}
            key={item.id}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} sx={{ color: "#fff" }} />
          </ListButton>
        </StyledLink>
      ))}
    </SidebarContainer>
  );
};
export default SideBar;
