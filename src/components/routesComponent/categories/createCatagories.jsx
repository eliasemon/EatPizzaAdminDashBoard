import { useState } from "react";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { addDataToCollection } from "../../../../utils";


const cataGoryModel = {
  name : ""
}
const CreateCatgories = () => {
  const [items , setItems] = useState(cataGoryModel)

  return (
    <Box >
      <TextField
        color="common"
        label="Create a new category"
        id="filled-size-normal"
        variant="filled"
        value = {items.name}
        onChange ={ (e) => setItems(prv => ({...prv, name : e.target.value}))}
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
        <Button onClick = {() => addDataToCollection(items , "catagories") } variant="contained" size="large">
          Create
        </Button>
        <Button variant="outlined" size="large">
          Discard
        </Button>
      </Box>
    </Box>
  );
};
export default CreateCatgories
