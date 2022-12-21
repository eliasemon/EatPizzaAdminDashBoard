import { styled } from "@mui/system";

const Background = styled("div")(({ theme }) => ({
  background: theme.palette.background,
  width: "100vw",
  height: "100vh",
  zIndex: 0,
}));

export default Background;
