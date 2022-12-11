import { styled } from "@mui/system";

export const DashboardContainer = styled("div")({
  display: "flex",
  width: "100%",
  height: "100%",
});

export const LeftContainer = styled("div")(({ theme }) => ({
  height: "auto",
  width: "30%",
  borderRadius: "5px 0 0 5px",
  padding: "2.5%",
  backgroundColor: theme.palette.secondary.deep,
}));

export const RightContainer = styled("div")(({ theme }) => ({
  height: "auto",
  width: "70%",
  borderRadius: "0 5px 5px 0",
  backgroundColor: theme.palette.secondary.light,
}));
