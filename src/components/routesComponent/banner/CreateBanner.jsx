import React from "react";
import {
  Button,
  Box,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CreateBannerStyle } from "./Banner.styled";
import { LabelText, InputText, ButtonGroup } from "./../../UI/Forms.styled";
import { FormControl } from "@material-ui/core";
import SelectOption from "./../../UI/SelectOption";
import useFileUploaderJSX from "../../../hooks/useFileUploader";



const itemsModel = {
  name: "",
  price: "",
  selectedCatagories: [],
};

const options = [
  {
    title: "Product Ref",
  },
  {
    title: "External Link",
  },
];

const CreateAddons = ({ EditAbleItem, status, clearUi }) => {
  const { ui, uploadProcess, image, setImage } = useFileUploaderJSX(false);
  const [items, setItems] = useState(EditAbleItem);
  const [activeItem, setActiveItem] = useState(0);

  const discardHandle = () => {
    if (clearUi) {
      clearUi();
    }
    setItems(itemsModel);
    setSelectedCatagories([]);
  };

  return (
    <CreateBannerStyle>
      <Box>
        <LabelText>Banner Title </LabelText>
        <InputText
          color="common"
          id="filled-size-normal"
          placeholder="Enter addons name"
          value={items.name}
          onChange={(e) =>
            setItems((prv) => ({ ...prv, name: e.target.value }))
          }
        />
      </Box>
      <SelectOption
        width="40%"
        options={options}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      {activeItem == 0 ? (
        <Box>
        <LabelText>Product Id</LabelText>
          <InputText
            color="common"
            id="filled-size-normal"
            placeholder="Enter Product Id"
            value={items.name}
            onChange={(e) =>
              setItems((prv) => ({ ...prv, name: e.target.value }))
            }
          />
        </Box>
      ) : (
        <Box>
          <LabelText>External Link</LabelText>
          <InputText
            color="common"
            id="filled-size-normal"
            placeholder="Enter external link"
            value={items.name}
            onChange={(e) =>
              setItems((prv) => ({ ...prv, name: e.target.value }))
            }
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1%",
        }}
      >
        {ui}
      </Box>
      <ButtonGroup>
        <Button variant="contained" size="large">
          Create
        </Button>
        <Button onClick={discardHandle} variant="outlined" size="large">
          Discard
        </Button>
      </ButtonGroup>
    </CreateBannerStyle>
  );
};
//

export default CreateAddons;
