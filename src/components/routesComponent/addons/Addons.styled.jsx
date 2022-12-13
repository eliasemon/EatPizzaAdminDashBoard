import { styled } from "@mui/system";
import { List, ListItem, TextField, Typography } from "@mui/material";

export const AddonsContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
});

export const HalfBox = styled("div")({
  width: "50%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const FilterSection = styled("div")(({ theme }) => ({
  borderRadius: "5px",
  padding: "20px",
  color: "#fff",
  // maxHeight: "20%",
  backgroundColor: theme.palette.secondary.light,
}));

export const LabelText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.text,
}));

export const CategoryList = styled(List)(({ theme }) => ({
  marginTop: "5%",
  width: "100%",
  maxHeight: "80%",
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

export const CreateAddonsStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 40,
}));