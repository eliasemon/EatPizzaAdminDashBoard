import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import { toast } from "react-toastify";

import { addDataToCollection, setDataToCollection } from "../../../../utils";
import { HighlightText, InputText, LabelText } from "../../UI/Forms.styled";
import SelectOption from "../../UI/SelectOption";

const ExtraCostCodeModel = {
  name: "",
  description: "",
  costType: "%",
  costValue: "",
};

const ExtraCostCreation = ({ EditAbleItem, status, clearUi }) => {
  const [costType, setCostType] = useState(EditAbleItem.costType);
  const [items, setItems] = useState(EditAbleItem);

  const handleToggleChange = (event, value) => {
    if (value !== null) {
      setItems((prv) => ({ ...prv, costValue: "", costType: value }));
      setCostType(value);
    }
  };

  useEffect(() => {
    setItems(EditAbleItem);
    setCostType(EditAbleItem.costType);
  }, [EditAbleItem]);

  const discardHandle = () => {
    if (clearUi) {
      clearUi("extraCost");
    }
    setCostType(ExtraCostCodeModel.costType);
    setItems(ExtraCostCodeModel);
  };
  const checkedCondition = (items) => {
    if (items.name == "" || items.costType == "" || items.costValue == "") {
      return true;
    }
    return false;
  };
  const updateFireStoreValue = async () => {
    if (checkedCondition(items)) {
      toast.error("Empty Field Can't added");
      return;
    }
    await setDataToCollection(items, "extraCost", false, false);
    discardHandle();
  };

  const creatHandle = async () => {
    if (checkedCondition(items)) {
      toast.error("Empty Field Can't added");
      return;
    }
    const data = { ...items, id: items.name };
    await setDataToCollection(data, "extraCost", true, false);
    setCostType(ExtraCostCodeModel.costType);
    setItems(ExtraCostCodeModel);
  };

  const options = [
    {
      title: "in Percentage",
      cb: () => {
        setItems((prv) => ({ ...prv, costType: "%" }));
      },
    },
    {
      title: "in Taka",
      cb: () => {
        setItems((prv) => ({ ...prv, costType: "taka" }));
      },
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.4rem",
      }}
    >
      <Box>
        {status ? (
          <LabelText>
            Update <HighlightText>{items.name}</HighlightText> ExtraCost item
          </LabelText>
        ) : (
          <LabelText>Create ExtraCost</LabelText>
        )}
        <InputText
          color="common"
          placeholder="Enter The Of The Cost"
          value={items.name}
          onChange={(e) =>
            setItems((prv) => ({ ...prv, name: e.target.value }))
          }
        />
      </Box>
      <Box>
        <LabelText>Description</LabelText>
        <InputText

          placeholder="Your description here"
          value={items.description}
          multiline
          row={4}
          onChange={(e) =>
            setItems((prv) => ({ ...prv, description: e.target.value }))
          }
          sx={{
            ".MuiInputBase-root": {
              color: "#fff",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ width: "50%" }}>
          <FormControl sx={{ width: "100%" }}>
            <LabelText>Cost type</LabelText>

            <ToggleButtonGroup
              color="primary"
              value={costType}
              exclusive
              onChange={handleToggleChange}
              aria-label="Platform"
            >
              <ToggleButton
                value="%"
                sx={{
                  color: "#fff",
                }}
              >
                In Percentage
              </ToggleButton>
              <ToggleButton
                value="taka"
                sx={{
                  color: "#fff",
                }}
              >
                In Taka
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
        </Box>
        <Box sx={{ width: "50%" }}>
          <LabelText>Cost Amount</LabelText>
          <InputText
            color="common"
            type="number"
            disabled={items.costType ? false : true}
            value={items.costValue}
            onChange={(e) => {
              if (items.costType === "%" && e.target.value > 100) {
                toast.error("May be It's Break The Rules");
                return;
              }
              setItems((prv) => ({ ...prv, costValue: e.target.value }));
            }}

          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: "2%" }}>
        {status ? (
          <Button
          sx={{color : "#ffff"}}
            onClick={updateFireStoreValue}
            variant="contained"
            size="large"
          >
            Update
          </Button>
        ) : (
          <Button  sx={{color : "#ffff"}} onClick={creatHandle} variant="contained" size="large">
            Create
          </Button>
        )}
        <Button color="error" onClick={discardHandle} variant="outlined" size="large">
          Discard
        </Button>
      </Box>
    </Box>
  );
};
export default ExtraCostCreation;
