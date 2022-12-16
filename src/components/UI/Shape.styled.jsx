import { styled } from "@mui/system";
import { List, ListItem, TextField, Typography } from "@mui/material";

export const HalfBox = styled("div")((props) => ({
  width: "50%",
  height: "95%",
  padding: "2%",
  display: "flex",
  flexDirection: "column",
  border: `2px solid ${props.color}`,
  borderRadius: "5px",
  marginLeft: "1%",
  marginRight: "1%",
  marginTop: "2%",
}));

export const CategoryList = styled(List)(({ theme }) => ({
  marginTop: "5%",
  width: "100%",
  backgroundColor: theme.palette.secondary.light,
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
  backgroundColor: theme.palette.secondary.dark,
  marginBottom: "5px",
  borderRadius: "5px",
  color: theme.palette.secondary.text,
  display: "flex",
  justifyContent: "space-between",
}));