import { Box } from "@mui/material";
import React from "react";

export const ContentCarrier = ({
  children,
  height,
  width,
  bgColor,
  flexDirection,
}) => {
  width = width ? width : "auto";
  height = height ? height : "auto";
  return (
    <Box
      sx={{
        flexWrap: "wrap",
        height: `${height}`,
        width: `${width}`,
        backgroundColor: `${bgColor}`,
        display: "flex",
        flexDirection: `${flexDirection}`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
};
export default ContentCarrier;
