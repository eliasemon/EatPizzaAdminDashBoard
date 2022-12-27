import { Button , Typography } from "@mui/material";
import React, { useEffect } from "react";
import { auth } from "../../../firebaseConfig";
import LogoContainer from "../logoContainer";
import { HeaderStyle, LogoWrapper } from "./ExploratoryElements.styled";

const Header = ({openingStatus}) => {
  return (
    <HeaderStyle bgcolor="secondary.deep">
      <LogoWrapper>
        <LogoContainer  width="180px" />
      </LogoWrapper>

      <Typography color={openingStatus.status ? "green" : "red"}> {openingStatus.message} </Typography> 
      <Button onClick={() => auth.signOut()}>Logout</Button>
    </HeaderStyle>
  );
};
export default Header;
