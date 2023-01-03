import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem

} from "@mui/material";

import { toast } from 'react-toastify';

import { addDataToCollection , setDataToCollection } from "../../../../utils";



const promoCodeModel = {
  name : "",
  description : "",
  discountType : "",
  discountValue : "",
  validity : "",
  howManyTimesUsed: "",
  conditionAmmount : 0
}

const CreatePromoCode = ({EditAbleItem , status , clearUi}) => {
  const [items , setItems] = useState(EditAbleItem)
  CreatePromoCode
  useEffect(()=>{
    setItems(EditAbleItem)
  },[EditAbleItem])

  const discardHandle = () =>{
    if(clearUi){
      clearUi()
    }
    setItems(promoCodeModel)
  } 
  const checkedCondition = (items) =>{
    if(items.name == "" || items.validity == "" || items.discountType == "" || items.discountValue == ""  ){
      return true
    }
    return false
  }
  const updateFireStoreValue = async() =>{
    if(checkedCondition(items)){
      toast.error("Empty Field Can't added");
      return
    }
    await setDataToCollection( items , "promoCode");
    discardHandle()
  }

  const creatHandle = async() =>{
    if(checkedCondition(items)){
      toast.error("Empty Field Can't added");
      return
    }
    await addDataToCollection(items , "promoCode")
    setItems(promoCodeModel)
  }
  return (
    <Box >
      <Typography color='white' py={1}>
          { status ? `Update The ***"${items.name}"*** promoCode Item` : `Create new PromoCode`}
      </Typography>
        
      <TextField
        color="common"
        label="Create a new PromoCode"
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
            width:'480px',
          },
          label: {
            color: "white",
          },
        }}
      />
      <Box></Box>
      <TextField
        color="common"
        label="Description"
        id="filled-size-normal"
        variant="filled"
        value = {items.description}
        onChange ={ (e) => setItems(prv => ({...prv, description : e.target.value}))}
        sx={{
          ".MuiInputBase-root": {
            backgroundColor: "secondary",
            border: "1px solid grey",
            width: "100%",
            marginTop:'10px'
          },
          input: {
            color: "white",
            width:'480px',
            height:'80px'
          },
          label: {
            color: "white",
          },
        }}
      />

    <Typography color='white' py={1}>
      Validity
    </Typography>
    <TextField
            color="common"
            type="datetime-local"
            id="filled-size-normal"
            // variant="filled"
            value = {items.validity}
            onChange ={(e) => setItems(prv => ({...prv , validity : e.target.value }))}
            sx={{
              ".MuiInputBase-root": {
                backgroundColor: "secondary",
                border: "1px solid grey",
                width: "100%",
              },
              input: {
                color: "white",
                width:'480px'
              },
              label: {
                color: "white",
              },
            }}
          />

    <Box sx={{ maxWidth:500 }}>
      <FormControl sx={{width:'480px'}}>
        <InputLabel id="demo-simple-select-label">Discount Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={items.discountType}
          label="Discount Type"
          onChange={(e)=>  setItems(prv => ({...prv , discountType : e.target.value }))}
        >
          <MenuItem value={"%"}>In Percentage "%"</MenuItem>
          <MenuItem value={"tk"}>In TK</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    

    <TextField
        color="common"
        label="Discount Ammount"
        id="filled-size-normal"
        variant="filled"
        type="number"
        disabled={(items.discountType ? false : true)}
        value = {items.discountValue}
        onChange ={ (e) =>{
          if(items.discountType == "%" && e.target.value > 100){
            toast.error("You Can't Provide More then 100% discount");
            return
          }
          setItems(prv => ({...prv, discountValue : e.target.value}))
        
          }
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

        <Typography>
        {`This Promo-Code Will Be Valid In More Than ${items.conditionAmmount} Tk. Order  `}
        </Typography>
<TextField
        color="common"
        label= "Order Ammount Condition"
        id="filled-size-normal"
        variant="filled"
        type="number"
        value = {items.conditionAmmount}
        onChange ={ (e) => setItems(prv => ({...prv, conditionAmmount : e.target.value}))}
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
      {status?
        <Button onClick = {updateFireStoreValue} variant="contained" size="large">
        Update
      </Button>
       : 
       <Button onClick = {creatHandle } variant="contained" size="large">
          Create
      </Button>
       }
        <Button onClick = {discardHandle} variant="outlined" size="large">
          Discard
        </Button>
      </Box>
    </Box>
  );
};
export default CreatePromoCode
