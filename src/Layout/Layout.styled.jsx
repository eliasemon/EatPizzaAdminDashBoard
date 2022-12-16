import { styled } from "@mui/system";

export const LayoutContainer = styled("div")({
  width: "100vw",
  height: "100vh",
});

export const BodyContainer = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "90%",
}));

export const RoutesWrapper = styled("div")({
  width: "85%",
  height: "98%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto auto",
});