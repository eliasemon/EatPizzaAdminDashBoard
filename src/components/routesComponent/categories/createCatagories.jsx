import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, Button, TextField, Typography } from "@mui/material";
import { addDataToCollection, setDataToCollection } from "../../../../utils";
import {
  LabelText,
  InputText,
  ButtonGroup,
  HighlightText,
} from "../../UI/Forms.styled";
import { CreateCategoryStyle } from "./Category.styled";

const cataGoryModel = {
  name: "",
};

const CreateCatgories = ({ EditAbleItem, status, clearUi }) => {
  const [items, setItems] = useState(EditAbleItem);

  useEffect(() => {
    setItems(EditAbleItem);
  }, [EditAbleItem]);

  const discardHandle = () => {
    if (clearUi) {
      clearUi();
    }
    setItems(cataGoryModel);
  };
  const updateFireStoreValue = async () => {
    if (items.name == "") {
      toast.error("Empty Field Can't added");
      return;
    }
    await setDataToCollection(items, "catagories");
    discardHandle();
  };

  const creatHandle = async () => {
    if (items.name == "") {
      toast.error("Empty Field Can't added");
      return;
    }
    await addDataToCollection(items, "catagories");
    setItems(cataGoryModel);
  };

  return (
    <CreateCategoryStyle>
      <Box>
        <LabelText>
          {status ? (
            <Typography>
              Update the <HighlightText>{items.name}</HighlightText> category
              item
            </Typography>
          ) : (
            <Typography>Create new category</Typography>
          )}
        </LabelText>

        <InputText
          color="common"
          id="filled-size-normal"
          placeholder="Enter category name "
          value={items.name}
          onChange={(e) =>
            setItems((prv) => ({ ...prv, name: e.target.value }))
          }
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
    </CreateCategoryStyle>
  );
};
export default CreateCatgories
