import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import AddVariantsAndVariantsListLoader from "./AddVariantsAndVariantsListLoader";
import SelectedCatagories from "../../UI/SelectedCatagories";
import ShowAddonsList from "./ShowAddonsList";
import { CreateItemsContainer } from "./CreateItems.styled";
import { InputSection, InputText, LabelText } from "../../UI/Forms.styled";
import { useNavigate  , useParams} from "react-router-dom";
import { setDataToCollection, shortUUID , getSingleDataWithOutRealTimeUpdates } from "../../../../utils";

import useFileUploaderJSX from "../../../hooks/useFileUploader";
import { toast } from 'react-toastify';




const CreateItems = ({update}) => {
  const {itemsIdToBeUpdated} = useParams()
  const navigate = useNavigate();
  const [items, setItems] = useState("");
  const [variants, setVariants] = useState({});
  const [selectedCatagories, setSelectedCatagories] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const  {ui , uploadProcess , image , setImage } = useFileUploaderJSX(update)

    
console.log(itemsIdToBeUpdated);
useEffect(()=>{
  if(update){
    getSingleDataWithOutRealTimeUpdates("productlist", itemsIdToBeUpdated).then((data)=>{
      setItems({...data})
      setVariants({...data.variants})
      setSelectedCatagories([...data.selectedCatagories])
      setSelectedAddons([...data.selectedAddons])
      setImage(data.image.imageDownloadUrl)
    }).catch((msg) => {
      navigate("/items")
      toast.error(msg)
    })
  }else{
    setItems(prv => ({...prv , id : `EatPizza-${shortUUID()}` }))
  }
  
},[])


  const createProduct = () => {
    if(items.name == ""  || Object.keys(variants).length == 0 ){
      toast.error("You have missed Some required Filed")
      return
    }
    if(image){
      uploadProcess("product", items.id).then((v) => {
        const data = {...items}
        data.variants = {...variants}
        data.selectedCatagories = [...selectedCatagories]
        data.selectedAddons = [...selectedAddons]
        data.image = {...v}
        setDataToCollection(data , "productlist" , false)
        navigate("/items")
      })
    }else{
      const data = {...items}
        data.variants = {...variants}
        data.selectedCatagories = [...selectedCatagories]
        data.selectedAddons = [...selectedAddons]
        data.image = {}
        setDataToCollection(data , "productlist" , false)
        navigate("/items")
      }
    
  }
  


  return (
    <CreateItemsContainer>
      <Box>
        <Typography> {update ? "Update The Items Information" : "Create New Items"}</Typography>
      </Box>
      <Box>
      <LabelText>Items ID</LabelText>
      <InputText
          color="common"
          disabled = {true}
          value = {items?.id}
          id="filled-size-normal"
        />
        
        <LabelText>Items Name</LabelText>
        <InputText
          color="common"
          value={items.name}
          onChange={(e) =>
            setItems((prv) => ({ ...prv, name: e.target.value }))
          }
          id="filled-size-normal"
        />
      </Box>
      <AddVariantsAndVariantsListLoader
        variants={variants}
        setVariants={setVariants}
      />

      {/* Catagories Select Option  */}
      <Box>
        <Typography>Please Select Catagory</Typography>
        <SelectedCatagories
          setSelectedCatagories={setSelectedCatagories}
          selectedCatagories={selectedCatagories}
        />
      </Box>

      {/* showing Addons Section  */}

      <Box>
        <ShowAddonsList
          selectedAddons={selectedAddons}
          setSelectedAddons={setSelectedAddons}
        />
      </Box>
      <Box
        sx={{
          marginTop: "1%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            color="common"
            label="Descriptions"
            id="filled-size-normal"
            variant="filled"
            onChange= { (e) => setItems(prv => ({...prv , descriptions : e.target.value}))}
            value ={items.descriptions || ""}
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
         
        </Box>

        {/* For Upload Image  */}
        <Box>
            {ui}
        </Box>
      </Box>

      <Box sx={{ marginTop: "3%", display: "flex", gap: "2%" }}>
        <Button onClick={createProduct} variant="contained" size="large">
          Complete
        </Button>
        <Button onClick ={() => navigate("/items") } variant="outlined" size="large">
          Discard
        </Button>
      </Box>
    </CreateItemsContainer>
  );
};
export default CreateItems;
