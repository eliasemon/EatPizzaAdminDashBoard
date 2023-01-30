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

const promoCodeModel = {
  name: "",
  description: "",
  discountType: "%",
  discountValue: "",
  validity: "",
  howManyTimesUsed: "",
  conditionAmmount: 0,
};

const CreatePromoCode = ({ EditAbleItem, status, clearUi }) => {
  const [discountType, setDiscountType] = useState("%");
  const [items, setItems] = useState(EditAbleItem);

  const handleToggleChange = (event, value) => {
    setItems((prv) => ({ ...prv, discountValue: "", discountType: value }));
    setDiscountType(value);
  };

  CreatePromoCode;
  useEffect(() => {
    setItems(EditAbleItem);
  }, [EditAbleItem]);

  const discardHandle = () => {
    if (clearUi) {
      clearUi();
    }
    setItems(promoCodeModel);
  };
  const checkedCondition = (items) => {
    if (
      items.name == "" ||
      items.validity == "" ||
      items.discountType == "" ||
      items.discountValue == ""
    ) {
      return true;
    }
    return false;
  };
  const updateFireStoreValue = async () => {
    if (checkedCondition(items)) {
      toast.error("Empty Field Can't added");
      return;
    }
    await setDataToCollection(items, "promoCode", false);
    discardHandle();
  };

  const creatHandle = async () => {
    if (checkedCondition(items)) {
      toast.error("Empty Field Can't added");
      return;
    }
    const data = { ...items, id: items.name };
    await setDataToCollection(data, "promoCode");
    setItems(promoCodeModel);
  };

  const options = [
    {
      title: "in Percentage",
      cb: () => {
        setItems((prv) => ({ ...prv, discountValue: 0, discountType: "%" }));
      },
    },
    {
      title: "in Taka",
      cb: () => {
        setItems((prv) => ({ ...prv, discountValue: 0, discountType: "taka" }));
      },
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: ".3rem",
      }}
    >
      {/* <Typography color="white" py={1}>
        {status
          ? `Update The ***"${items.name}"*** promoCode Item`
          : `Create new PromoCode`}
      </Typography> */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          {status ? (
            <LabelText>
              Update <HighlightText>{items.name}</HighlightText> promocode item
            </LabelText>
          ) : (
            <LabelText>Create new promocode</LabelText>
          )}
          <InputText
            color="common"
            placeholder="Enter a code"
            value={items.name}
            onChange={(e) =>
              setItems((prv) => ({ ...prv, name: e.target.value }))
            }
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <LabelText>Validity</LabelText>
          <TextField
            color="common"
            type="datetime-local"
            value={items.validity}
            onChange={(e) =>
              setItems((prv) => ({ ...prv, validity: e.target.value }))
            }
            sx={{
              width: "100%",
              ".MuiInputBase-root": {
                backgroundColor: "secondary",
                border: "1px solid grey",
              },
              input: {
                color: "white",
                width: "480px",
              },
              label: {
                color: "white",
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <LabelText>Description</LabelText>
          <InputText
            // color="white"
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
        <Box sx={{ width: "50%", marginLeft: ".5rem" }}>
          <LabelText>Order amount condition</LabelText>
          <InputText
            color="common"
            type="number"
            value={items.conditionAmmount}
            onChange={(e) =>
              setItems((prv) => ({ ...prv, conditionAmmount: e.target.value }))
            }
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
      </Box>
      <LabelText>
        <span style={{ color: "yellow" }}>Note: </span>This Promo-Code Will Be
        Valid In More Than {items.conditionAmmount} Tk. Order
      </LabelText>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ width: "50%", marginRight: "5%" }}>
          <FormControl sx={{ width: "100%" }}>
            <LabelText>Discount type</LabelText>
            {/* <InputLabel id="demo-simple-select-label">Discount Type</InputLabel> */}
            <ToggleButtonGroup
              color="primary"
              value={discountType}
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
            {/* <SelectOption
              // width="100%"
              options={options}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            /> */}
            {/* <Select
              // labelId="demo-simple-select-label"
              // id="demo-simple-select"
              autoWidth={false}
              value={items.discountType}
              // label="Discount Type"
              onChange={(e) =>
                setItems((prv) => ({ ...prv, discountType: e.target.value }))
              }
            >
              <MenuItem value={"%"}>In Percentage</MenuItem>
              <MenuItem value={"tk"}>In Taka</MenuItem>
            </Select> */}
          </FormControl>
        </Box>
        <Box sx={{ width: "50%", marginRight: "5%" }}>
          <LabelText>Discount amount</LabelText>
          <InputText
            color="common"
            type="number"
            disabled={items.discountType ? false : true}
            value={items.discountValue}
            onChange={(e) => {
              if (items.discountType == "%" && e.target.value > 100) {
                toast.error("You Can't Provide More then 100% discount");
                return;
              }
              setItems((prv) => ({ ...prv, discountValue: e.target.value }));
            }}
          />
        </Box>
      </Box>

      {/* <Typography>
        {`This Promo-Code Will Be Valid In More Than ${items.conditionAmmount} Tk. Order  `}
      </Typography> */}

      <Box sx={{ display: "flex", gap: 2, marginTop: "1rem" }}>
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
      </Box>
    </Box>
  );
};
export default CreatePromoCode;
