import { Box } from "@mui/system";
import React from "react";
import LogoContainer from "../logoContainer";

LogoContainer;
const Header = () => {
  return (
    <Box
      bgcolor="secondary.deep"
      sx={{
        width: "100%",
        height: "100%",
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
      <Box>logged in as Admin</Box>
    </Box>
  );
};
export default Header;
