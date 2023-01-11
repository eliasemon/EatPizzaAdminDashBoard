import { styled } from "@mui/system";
import { Box } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";

export const HeaderStyle = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "10%",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 2%",
  backgroundColor: theme.palette.surface.dp01,
  zIndex: 1,
}));

export const LogoWrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const SidebarContainer = styled("div")(({ theme }) => ({
  width: "15%",
  height: "100%",
  backgroundColor: theme.palette.surface.dp01,
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "scroll",

  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

export const ListButton = styled("div")(({ theme, selected }) => ({
  // margin: "5% 15%",
  // margin: "2.5%",
  padding: "5%",
  margin: "2.5% 5%",
  flex: 1,
  //  margin: "30px",
  //  padding: "10px",
  borderRadius: "5px",
  display: "flex",
  backgroundColor: selected && theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transitionDuration: ".5s",
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  display: "flex",
  textDecoration: "none",
  alignItems: "center",
  // padding: "10px",
  // borderRadius: "5px",
  // "&:hover": {
  //   backgroundColor: theme.palette.primary.main,
  //   transitionDuration: ".5s",
    
  // },
  
}));

// export const StyledLink = styled(Link)(({ theme }) => ({
//   display: "flex",
//   textDecoration: "none",
//   alignItems: "center",
//   padding: "0 5px",
//   "&:hover": {
//     backgroundColor: theme.palette.primary.main,
//     transitionDuration: ".5s",
    
//   },
  
// }));