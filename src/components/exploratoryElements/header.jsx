import { Button } from "@mui/material";
import React from "react";
import { auth } from "../../../firebaseConfig";
import LogoContainer from "../logoContainer";
import { HeaderStyle, LogoWrapper } from "./ExploratoryElements.styled";

const Header = () => {
  return (
    <HeaderStyle bgcolor="secondary.deep">
      <LogoWrapper>
        <LogoContainer width="180px" />
      </LogoWrapper>
      <Button onClick={() => auth.signOut()}>Logout</Button>
    </HeaderStyle>
  );
};
export default Header;
