import { styled } from "@mui/system";
import { Typography, TextField } from "@mui/material";

export const LabelText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.common.white,
  marginBottom: ".75rem",
}));

export const InputSection = styled("div")(({ theme }) => ({
  marginBottom: "20%",
}));

export const InputText = styled(TextField)(({ theme }) => ({
  width: "100%",

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
