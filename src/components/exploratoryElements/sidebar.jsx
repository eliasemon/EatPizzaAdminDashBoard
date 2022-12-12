import React, { useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import categories from "./../../constants/categoriesList";
import {
  SidebarContainer,
  ListButton,
  StyledLink,
} from "./ExploratoryElements.styled";

const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <SidebarContainer>
      {categories.map((item) => (
        <ListButton
          onClick={(event) => handleListItemClick(event, 0)}
          key={item.id}
        >
          <StyledLink to={item.link}>
            <ListItemIcon sx={{ color: "secondary.text" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              sx={{ color: "secondary.text" }}
            />
          </StyledLink>
        </ListButton>
      ))}
    </SidebarContainer>
  );
};
export default SideBar;
