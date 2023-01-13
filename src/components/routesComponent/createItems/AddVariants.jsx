import { Box , TextField , Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import { UUID } from "../../../../utils";

const VariantsModel = {
    name : "",
    regularPrice : "",
    sellingPrice : "",
    id : ""
}
const AddVariants = ({onStateLift , incomingItem}) => {
    const [variantsItem , setVariantsItem] = useState(VariantsModel)


    const onCreateHandle =  () =>{
        if(variantsItem.name == "" || variantsItem.regularPrice == ""){
            toast.error("Can't Added With Empty Field")
            return
        }
        const data = {...variantsItem}
        if(data.sellingPrice == ""){
          data.sellingPrice = data.regularPrice
        }
        onStateLift( true ,data)
        setVariantsItem(VariantsModel)

    }
    const Discard = () =>{
        onStateLift( false)
        setVariantsItem(VariantsModel)
    }
    useEffect(()=>{
      if(incomingItem){
        setVariantsItem({...incomingItem})
      }else{
        setVariantsItem(prv => ({...prv , id : UUID()}))
      }
    },[])
  return (
    <Dialog open={true} onClose={Discard} sx={{background:"#121212",opacity:'0.95'}}>
        <TextField
        color="common"
        onChange = {(e)=> setVariantsItem(prv => ({...prv , name : e.target.value}))}
        value={variantsItem.name}
        label="Variant Name"
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

<TextField
        color="common"
        onChange = {(e)=> setVariantsItem(prv => ({...prv , regularPrice : e.target.value}))}
        label="Regular Price"
        id="filled-size-normal"
        value={variantsItem.regularPrice}
        variant="filled"
        type = "number"
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
      <TextField
        color="common"
        onChange = {(e)=> setVariantsItem(prv => ({...prv , sellingPrice : e.target.value}))}
        label="Selling Price"
        value ={variantsItem.sellingPrice}
        id="filled-size-normal"
        variant="filled"
        type = "number"
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
        <Box>
        <Button onClick={onCreateHandle} variant="contained" size="large">
          Complete
        </Button>
        <Button onClick={Discard} variant="outlined" size="large">
          Discard
        </Button>
        </Box>
    </Dialog>
  )
}

export default AddVariants
