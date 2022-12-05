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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Categories = () => {
  const categoriesList = [
    {
      id: "1",
      title: "Burger",
    },
    {
      id: "2",
      title: "Pizza",
    },
    {
      id: "3",
      title: "Sandwich",
    },
    {
      id: "4",
      title: "Coffee",
    },
    {
      id: "5",
      title: "Juice",
    },
    {
      id: "6",
      title: "Kacchi",
    },
    {
      id: "7",
      title: "Biriyani",
    },
    {
      id: "8",
      title: "Khichuri",
    },
    {
      id: "9",
      title: "Tehari",
    },
  ];
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
      <Box sx={{ marginTop: "3%", display: "flex", gap: "2%" }}>
        <Button variant="contained" size="large">
          Create
        </Button>
        <Button variant="outlined" size="large">
          Discard
        </Button>
      </Box>
      <Box>
        <List
          sx={{
            width: "100%",
            maxWidth: 400,
            marginTop: "5%",
            bgcolor: "secondary",
            position: "relative",
            overflow: "auto",
            color: "common.white",
            // maxHeight: 300,
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          {
            <ul>
              {categoriesList.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    backgroundColor: "secondary.dark",
                    marginBottom: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText primary={item.title} />
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Box>
                      <EditIcon
                        sx={{
                          "&:hover": {
                            color: "secondary.light",
                            cursor: "pointer",
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <DeleteIcon
                        sx={{
                          "&:hover": {
                            color: "secondary.light",
                            cursor: "pointer",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </ul>
          }
        </List>
      </Box>
    </Box>
  );
};
export default Categories;
