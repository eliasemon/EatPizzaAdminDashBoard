import { Button, Box, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { addDataToCollection, setDataToCollection } from "../../../../utils";
import SelectedCatagories from "../../UI/SelectedCatagories";
import { toast } from "react-toastify";
import { CreateAddonsStyle } from "./Addons.styled";
import {
  LabelText,
  InputText,
  ButtonGroup,
  HighlightText,
} from "./../../UI/Forms.styled";

const itemsModel = {
  name: "",
  price: "",
  selectedCatagories: [],
};

const CreateAddons = ({ EditAbleItem, status, clearUi }) => {
  const [items, setItems] = useState(EditAbleItem);
  const [selectedCatagories, setSelectedCatagories] = useState([]);

  useEffect(() => {
    setItems(EditAbleItem);
    setSelectedCatagories([...EditAbleItem.selectedCatagories]);
  }, [EditAbleItem]);

  useEffect(() => {
    setItems((prv) => ({
      ...prv,
      selectedCatagories: [...selectedCatagories],
    }));
  }, [selectedCatagories]);

  const discardHandle = () => {
    if (clearUi) {
      clearUi();
    }
    setItems(itemsModel);
    setSelectedCatagories([]);
  };

  const updateFireStoreValue = async () => {
    if (items.name == "" || items.price == "") {
      toast.error("Empty Field Can't added!!");
      return;
    }
    await setDataToCollection(items, "Addons", false);
    discardHandle();
  };

  const creatHandle = async () => {
    if (items.name == "" || items.price == "") {
      toast.error("Empty Field Can't added!!");
      return;
    }

    await addDataToCollection(items, "Addons");
    setItems(itemsModel);
    setSelectedCatagories([]);
  };

  return (
    <CreateAddonsStyle>
      <Box>
        {status ? (
          <LabelText>
            Update the <HighlightText>{items.name}</HighlightText> addons item
          </LabelText>
        ) : (
          <LabelText>Name </LabelText>
        )}

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
      <Box>
        <LabelText>Price</LabelText>
        <TextField
          color="common"
          placeholder="Enter price"
          id="filled-size-normal"
          value={items.price}
          onChange={(e) =>
            setItems((prv) => ({ ...prv, price: e.target.value }))
          }
          type="number"
          sx={{
            width: "50%",
            "&:focus": {
              border: "none",
            },
            ".MuiInputBase-root": {
              border: "1px solid #989898",
            },
            input: {
              color: "white",
              "&:focus": {
                outline: "none",
              },
            },
            label: {
              color: "white",
            },
          }}
        />
      </Box>
      <Box>
        <LabelText>Select any category for addons</LabelText>
        <SelectedCatagories
          selectedCatagories={selectedCatagories}
          setSelectedCatagories={setSelectedCatagories}
        />
      </Box>
      <ButtonGroup>
        {status ? (
          <Button
            onClick={updateFireStoreValue}
            variant="contained"
            size="large"
          >
            Update
          </Button>
        ) : (
          <Button onClick={creatHandle} variant="contained" size="large">
            Create
          </Button>
        )}
        <Button onClick={discardHandle} variant="outlined" size="large">
          Discard
        </Button>
      </ButtonGroup>
    </CreateAddonsStyle>
  );
};
//

export default CreateAddons;
