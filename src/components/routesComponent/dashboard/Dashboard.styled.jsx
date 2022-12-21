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
  width: "70%",

  padding: "1.5rem",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",

}));

export const Section = styled("div")((props) => ({
  width: "100%",
  minHeight: "30%",
  padding: props.padding ?? "1rem",
  margin: props.margin ?? "1rem",
  backgroundColor: props.theme.palette.surface.dp16,
  borderRadius: "5px",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));