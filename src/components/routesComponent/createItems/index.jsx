import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import AddVariantsAndVariantsListLoader from "./AddVariantsAndVariantsListLoader";
import SelectedCatagories from "../../UI/SelectedCatagories";
import ShowAddonsList from "./ShowAddonsList";
import { CreateItemsContainer } from "./CreateItems.styled";
import { InputSection, InputText, LabelText } from "../../UI/Forms.styled";
import FileUploaderJSX from "../../UI/FileUploader";





const CreateItems = () => {
  const [items, setItems] = useState("");
  const [variants, setVariants] = useState({});
  const [selectedCatagories, setSelectedCatagories] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
    const [image,setImage]=useState('')
  console.log(selectedAddons);
  // const handleChange = (event) => {
  //   // setAge(event.target.value);
  // }

  return (
    <CreateItemsContainer>
      <Box>
        <LabelText>Product Name</LabelText>
        <InputText
          color="common"
          onChange={(e) =>
            setItems((prv) => ({ ...prv, name: e.target.value }))
          }
          id="filled-size-normal"
        />
      </Box>
      <AddVariantsAndVariantsListLoader
        variants={variants}
        setVariants={setVariants}
      />

      {/* Catagories Select Option  */}
      <Box>
        <Typography>Please Select Catagory</Typography>
        <SelectedCatagories
          setSelectedCatagories={setSelectedCatagories}
          selectedCatagories={selectedCatagories}
        />
      </Box>

      {/* showing Addons Section  */}

      <Box>
        <ShowAddonsList
          selectedAddons={selectedAddons}
          setSelectedAddons={setSelectedAddons}
        />
      </Box>
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
         
        </Box>
        <Box>
        <FileUploaderJSX image = {image} setImage = {setImage}  />
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
    </CreateItemsContainer>
  );
};
export default CreateItems;
