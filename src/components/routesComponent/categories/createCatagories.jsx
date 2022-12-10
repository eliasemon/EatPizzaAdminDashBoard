import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";
import { addDataToCollection , setDataToCollection } from "../../../../utils";
import { toast } from 'react-toastify';



const cataGoryModel = {
  name : ""
}

const CreateCatgories = ({EditAbleItem , status , clearUi}) => {
  const [items , setItems] = useState(EditAbleItem)

  useEffect(()=>{
    setItems(EditAbleItem)
  },[EditAbleItem])

  const discardHandle = () =>{
    if(clearUi){
      clearUi()
    }
    setItems(cataGoryModel)
  } 
  const updateFireStoreValue = async() =>{
    if(items.name == ""){
      toast.error("Empty Field Can't added");
      return
    }
    await setDataToCollection( items , "catagories");
    discardHandle()
  }

  const creatHandle = async() =>{
    if(items.name == ""){
      toast.error("Empty Field Can't added");
      return
    }
    await addDataToCollection(items , "catagories")
    setItems(cataGoryModel)
  }
  
  return (
    <Box >
      <Typography>
          { status ? `Update The ***"${items.name}"*** Catagories Item` : `Create new Catagory`}
      </Typography>
        
      <TextField
        color="common"
        label="Create a new category"
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
export default CreateCatgories
