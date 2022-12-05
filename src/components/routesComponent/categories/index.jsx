import {
  Box,
  FilledInput,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

const Categories = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "17.9vw auto",
        width: "100%",
        height: "100%",
      }}
    >
      <TextField
        color="common"
        label="Create a new category"
        id="filled-size-normal"
        variant="filled"
        sx={{
          ".MuiInputBase-root": {
            backgroundColor: "secondary",
            border: "1px solid grey",
            width: "100%",
          },
          input: {
            color: "white",
          },
          label: {
            color: "white",
          },
        }}
      />
    </Box>
  );
};
export default Categories;
