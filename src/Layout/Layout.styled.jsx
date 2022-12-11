import { styled } from "@mui/system";

export const LayoutContainer = styled("div")({
  width: "100vw",
  height: "100vh",
});

export const BodyContainer = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "90%",
  backgroundColor: theme.palette.secondary.dark,
}));

export const RoutesWrapper = styled("div")({
  width: "82%",
  height: "93%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto auto",
  borderRadius: "5px",
});