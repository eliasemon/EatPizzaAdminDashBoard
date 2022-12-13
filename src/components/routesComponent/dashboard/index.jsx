import { Box } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

const Dashboard = () => {
  toast.dismiss("LoadingScreen");
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "17.9vw auto",
        width: "100%",
        height: "100%",
      }}
    >
      <LeftContainer />

      <RightContainer />
    </Box>
  );
};
export default Dashboard;
