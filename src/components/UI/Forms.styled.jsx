import { styled } from "@mui/system";
import { Typography, TextField } from "@mui/material";

export const LabelText = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.secondary.text,
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

export const HighlightText = styled("span")({
  color: "yellow",
  fontWeight: "600",
});