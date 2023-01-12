import { styled } from "@mui/system";

export const BannerContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent:'center',
  alignItems:'center'
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
  gap: 40,
}));
