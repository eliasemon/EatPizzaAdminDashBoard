import { styled } from "@mui/system";

export const DashboardContainer = styled("div")({
  display: "flex",
  width: "100%",
  height: "100%",
});

export const LeftContainer = styled("div")({
  width: "30%",
  padding: "2.5%",
  overflow: "hidden",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
});

export const RightContainer = styled("div")(({ theme }) => ({
  height: "auto",
  width: "70%",
  backgroundColor: theme.palette.secondary.light,
}));
