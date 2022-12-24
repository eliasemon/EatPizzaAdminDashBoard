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
}));

export const ListButton = styled('div')(({ theme }) => ({
 margin: "30px",
 padding: "10px",
  borderRadius: "5px",
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