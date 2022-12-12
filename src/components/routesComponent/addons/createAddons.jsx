import { Button, Box, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { addDataToCollection, setDataToCollection } from "../../../../utils";
import SelectedCatagories from "../../UI/SelectedCatagories";
import { toast } from "react-toastify";
import { LabelText, InputText, ButtonGroup } from "./Addons.styled";

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
    <Box>
      <Box>
        <LabelText>
          {status
            ? `Update The ***"${items.name}"*** Addons Item`
            : `Create new Catagory`}
        </LabelText>
        <InputText
          color="common"
          id="filled-size-normal"
          placeholder="Enter category name"
          // variant="filled"
          value={items.name}
          onChange={(e) =>
            setItems((prv) => ({ ...prv, name: e.target.value }))
          }
          sx={{
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
          }}
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
            width: "25%",
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
          }}
        />
      </Box>
      <LabelText>Select any category</LabelText>
      <SelectedCatagories
        selectedCatagories={selectedCatagories}
        setSelectedCatagories={setSelectedCatagories}
      />
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
    </Box>
  );
};
//

export default CreateAddons;
