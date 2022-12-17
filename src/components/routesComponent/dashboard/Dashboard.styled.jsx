import { styled } from "@mui/system";

export const DashboardContainer = styled("div")({
  display: "flex",
  width: "100%",
  height: "100%",
});

export const LeftContainer = styled("div")({
  height: "auto",
  width: "30%",
  padding: "2.5%",
});

export const RightContainer = styled("div")(({ theme }) => ({
  height: "auto",
  width: "70%",
  position : "relative",
  backgroundColor: theme.palette.secondary.light,
}));
