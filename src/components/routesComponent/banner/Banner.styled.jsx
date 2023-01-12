import { styled } from "@mui/system";

export const BannerContainer = styled("div")({
  // width: "100%",
  // height: "100vh",
  // display: "flex",
  // justifyContent:'center',
  // alignItems:'center',
  // boxSizing: 'border-box'
  width: "98%",
  height: "90vh",
  display: "flex",
  justifyContent:'center',
  alignItems:'center',
  boxSizing: 'border-box'
});

export const FilterSection = styled("div")(({ theme }) => ({
  borderRadius: "5px",
  padding: "20px",
  color: "#fff",
  backgroundColor: theme.palette.surface.dp03,
  boxShadow: theme.shadows[5],
}));

export const CreateBannerStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  boxSizing:'border-box',
  height:'80vh'
}));
