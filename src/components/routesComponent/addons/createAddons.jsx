import { Button , Box , TextField } from '@mui/material'
import {useState} from 'react'
import { addDataToCollection } from "../../../../utils";
//firebase import
import { db } from '../../../../firebaseConfig'
import { collection, addDoc } from "firebase/firestore";


const itemsModel = {
    name : "",
    price : ""
  }


const CreateAddons = () => {
  const [items , setItems] = useState(itemsModel);


  return (
    <Box >
        <TextField
          color="common"
          label="Create a new Addons"
          id="filled-size-normal"
          variant="filled"
          value = {items.name}
          onChange={(e)=> setItems(prv => ({...prv, name : e.target.value}))}
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
        <TextField
          color="common"
          label="Price"
          id="filled-size-normal"
          variant="filled"
          value = {items.price}
          onChange={(e)=> setItems(prv => ({...prv, price : e.target.value}))}
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
        <Box sx={{ marginTop: "3%", display: "flex", gap: "2%" }}>
            <Button onClick={(e) => {addDataToCollection(items , "Addons") ; setItems(itemsModel) }} variant="contained" size="large">
            Create
            </Button>
            <Button variant="outlined" size="large">
            Discard
            </Button>
      </Box>
    </Box>    
  )
}
// 

export default CreateAddons
