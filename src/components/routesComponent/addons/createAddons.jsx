import { Button , Box , TextField ,Typography} from '@mui/material'
import {useState , useEffect} from 'react'
import { addDataToCollection  , setDataToCollection } from "../../../../utils";
import SelectedCatagories from '../../UI/SelectedCatagories';
import { toast } from 'react-toastify';


const itemsModel = {
    name : "",
    price : "",
    selectedCatagories : [] 
  }


const CreateAddons = ({EditAbleItem , status , clearUi}) => {
  const [items , setItems] = useState(EditAbleItem);
  const [selectedCatagories , setSelectedCatagories] = useState([])
  

  useEffect(()=>{
    setItems(EditAbleItem)
    setSelectedCatagories([...EditAbleItem.selectedCatagories])
  },[EditAbleItem])

  useEffect(()=>{
    setItems(prv => ({...prv , selectedCatagories : [...selectedCatagories]}))
  },[selectedCatagories])
  
  const discardHandle = () =>{
    if(clearUi){
      clearUi()
    }
    setItems(itemsModel)
    setSelectedCatagories([])
  } 
  const updateFireStoreValue = async() =>{
    if(items.name == "" || items.price == "" ){
      toast.error("Empty Field Can't added!!");
      return
    }
    await setDataToCollection( items , "Addons" , false);
    discardHandle()
  }
  const creatHandle = async() =>{
    if(items.name == "" || items.price == ""){
      toast.error("Empty Field Can't added!!");
      return
    }
    await addDataToCollection(items , "Addons")
    setItems(itemsModel)
    setSelectedCatagories([])
  }
  
  
  return (
    <Box >
      <Typography>
          { status ? `Update The ***"${items.name}"*** Addons Item` : `Create new Catagory`}
      </Typography>
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
        <Typography>
          Select Any Catagory
        </Typography>
        <SelectedCatagories selectedCatagories={selectedCatagories} setSelectedCatagories= {setSelectedCatagories}  />
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
  )
}
// 

export default CreateAddons
