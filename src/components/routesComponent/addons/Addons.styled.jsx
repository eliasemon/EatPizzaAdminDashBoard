import { styled } from "@mui/system";
import { List, ListItem, TextField, Typography } from "@mui/material";

export const AddonsContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
});

export const LabelText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.text,
}));

export const CategoryList = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  //   backgroundColor: theme.palette.secondary.light,
  position: "relative",
  overflow: "auto",
  color: "common.white",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "& ul": {
    padding: 0,
    "& li": {
      marginBottom: "4%",
    },
  },
}));

export const InputSection = styled("div")(({ theme }) => ({
  marginBottom: "20%",
}));

export const InputText = styled(TextField)(({ theme }) => ({
  width: "70%",
  ".MuiInputBase-root": {
    backgroundColor: "secondary",
    border: "1px solid grey",
  },
  input: {
    color: "white",
  },
  label: {
    color: "white",
  },
}));

export const ButtonGroup = styled("div")({
  display: "flex",
  gap: "4%",
});

export const ListElement = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  marginBottom: "5px",
  borderRadius: "5px",
  color: theme.palette.secondary.text,
}));
