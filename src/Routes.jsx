import { Box } from "@mui/system";
import React from "react";
import Categories from "./components/routesComponent/categories";
import Dashboard from "./components/routesComponent/dashboard/index";

const Routes = () => {
  return (
    <Box
      sx={{
        pt: "1.5vw",
        pl: "1.5vw",
        boxSizing: "border-box",
        width: "97%",
        height: "96%",
        borderRadius: "5px",
        backgroundColor: "#212936",
      }}
    >
      <Categories />
    </Box>
  );
};

export default Routes;
