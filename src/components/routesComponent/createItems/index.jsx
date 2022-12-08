import { useState } from "react";
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";

const AllItems = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // gridTemplateColumns: "17.9vw auto",
        width: "100%",
        height: "100%",
        padding: "3%",
      }}
    >
      <TextField
        color="common"
        label="Product Name"
        id="filled-size-normal"
        variant="filled"
        sx={{
          marginTop: "1%",
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
      <Box
        sx={{
          marginTop: "1%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            color="common"
            label="Product Price"
            id="filled-size-normal"
            variant="filled"
            sx={{
              marginTop: "1%",
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
          <FormControl sx={{ marginTop: "1%", minWidth: 120 }}>
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              sx={{
                marginTop: "5%",
                color: "white",
                border: "1px solid grey",
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
            >
              <MenuItem value="" disabled>
                Categories
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            placeholder="Enter Description......."
            sx={{
              marginTop: "10%",
              minWidth: "500px",
              ".MuiInputBase-root": {
                backgroundColor: "secondary",
                border: "1px solid grey",
                // width: "100%",
              },
            }}
            inputProps={{
              sx: {
                "&::placeholder": {
                  color: "white",
                },
              },
            }}
          />
        </Box>
        <Box>
          <h1>Image Upload</h1>
        </Box>
      </Box>

      <Box sx={{ marginTop: "3%", display: "flex", gap: "2%" }}>
        <Button variant="contained" size="large">
          Complete
        </Button>
        <Button variant="outlined" size="large">
          Discard
        </Button>
      </Box>
    </Box>
  );
};
export default AllItems;
