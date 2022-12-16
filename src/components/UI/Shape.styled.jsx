import { styled } from "@mui/system";
import { List, ListItem, TextField, Typography } from "@mui/material";

export const HalfBox = styled("div")((props) => ({
  width: "50%",
  padding: "1.5%",
  display: "flex",
  flexDirection: "column",
  border: `2px solid ${props.theme.palette.color[props.color] ?? "#fff"}`,
  borderRadius: "5px",
  margin: "1.5%",
  backgroundColor: props.theme.palette.surface.dp01,
}));

export const CategoryList = styled(List)(({ theme }) => ({
  marginTop: "5%",
  width: "100%",
  backgroundColor: theme.palette.surface.dp03,
  boxShadow: theme.shadows[5],
  position: "relative",
  overflow: "auto",
  color: "common.white",
  padding: "20px",
  borderRadius: "5px",
  "&::-webkit-scrollbar-thumb": {
    background: "#000",
    borderRadius: "10px",
  },
  "& ul": {
    padding: 0,
    "& li": {
      marginBottom: "4%",
    },
  },
}));

export const ListElement = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.surface.dp08,
  boxShadow: theme.shadows[7],
  marginBottom: "5px",
  borderRadius: "5px",
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "space-between",
}));