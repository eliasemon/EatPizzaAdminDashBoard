import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { auth } from "../../../firebaseConfig";
import LogoContainer from "../logoContainer";

LogoContainer;
const Header = () => {
  return (
    <Box
      bgcolor="secondary.deep"
      sx={{
        width: "100%",
        height: "10%",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LogoContainer width="180px" />
      </Box>
      <Button onClick={() => auth.signOut()}>Logout</Button>
    </Box>
  );
};
export default Header;
