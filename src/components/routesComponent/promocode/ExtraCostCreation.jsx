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
} from "@mui/material";

import { toast } from "react-toastify";

import { addDataToCollection, setDataToCollection } from "../../../../utils";
import { InputText, LabelText } from "../../UI/Forms.styled";
import SelectOption from "../../UI/SelectOption";

const ExtraCostCodeModel = {
  name: "",
  description: "",
  costType: "",
  costValue: "",
};

const ExtraCostCreation = ({ EditAbleItem, status, clearUi }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [items, setItems] = useState(EditAbleItem);
  useEffect(() => {
    setItems(EditAbleItem);
  }, [EditAbleItem]);

  const discardHandle = () => {
    if (clearUi) {
      clearUi("extraCost");
    }
    setItems(promoCodeModel);
  };
  const checkedCondition = (items) => {
    if (
      items.name == "" ||
      items.costType == "" ||
      items.costValue == ""
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
    await setDataToCollection(items, "extraCost", false);
    discardHandle();
  };

  const creatHandle = async () => {
    if (checkedCondition(items)) {
      toast.error("Empty Field Can't added");
      return;
    }
    const data = {...items , id : items.name}
    await setDataToCollection(data, "extraCost");
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
      {/* <Typography color="white" py={1}>
        {status
          ? `Update The ***"${items.name}"*** promoCode Item`
          : `Create new PromoCode`}
      </Typography> */}
      <Box>
        {status ? (
          <LabelText>
            Update the <HighlightText>{items.name}</HighlightText> ExtraCost
            item
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
          // sx={{
          //   ".MuiInputBase-root": {
          //     backgroundColor: "secondary",
          //     border: "1px solid grey",
          //     width: "100%",
          //   },
          //   input: {
          //     color: "white",
          //     width: "480px",
          //   },
          //   label: {
          //     color: "white",
          //   },
          // }}
        />
      </Box>
      <Box>
        <LabelText>Description</LabelText>
        <InputText
          // color="white"
          placeholder="Write your description here"
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
          // sx={{
          //   ".MuiInputBase-root": {
          //     backgroundColor: "secondary",
          //     border: "1px solid grey",
          //     width: "100%",
          //     // marginTop: "10px",
          //   },
          //   input: {
          //     color: "white",
          //     width: "480px",
          //     height: "80px",
          //   },
          //   label: {
          //     color: "white",
          //   },
          // }}
        />
      </Box>
      <Box sx={{ display: "flex", width: "100%" }}>

        <Box sx={{ width: "50%", marginRight: "5%" }}>
          <FormControl sx={{ width: "100%" }}>
            <LabelText>Cost type</LabelText>
            {/* <InputLabel id="demo-simple-select-label">Discount Type</InputLabel> */}
            <SelectOption
              // width="100%"
              options={options}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
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
      </Box>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ width: "50%", marginRight: "5%" }}>
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
            // sx={{
            //   ".MuiInputBase-root": {
            //     backgroundColor: "secondary",
            //     border: "1px solid grey",
            //     width: "100%",
            //   },
            //   input: {
            //     color: "white",
            //   },
            //   label: {
            //     color: "white",
            //   },
            // }}
          />
        </Box>

        {/* <Typography>
        {`This Promo-Code Will Be Valid In More Than ${items.conditionAmmount} Tk. Order  `}
      </Typography> */}
      </Box>
      <Box sx={{ display: "flex", gap: "2%" }}>
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
export default ExtraCostCreation;
