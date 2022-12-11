import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const HeaderStyle = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "10%",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 2%",
}));

export const LogoWrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
