import { styled } from "@mui/system";

export const LayoutContainer = styled("div")({
  maxWidth: "1200px",
  // width: "100%",
  height: "100%",
  margin: "0 auto",
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
});