import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import CreateAddons from "./createAddons";
import SelectedCatagories from '../../UI/SelectedCatagories';
import { showDataByArrayQuers , showDataWithOutPagination ,  delteColloctionInstance} from "../../../../utils";

const itemsModel = {
  name : "",
  price : "",
  selectedCatagories : [] 
}



const Addons = () => {
 const [items , setItems] = useState("")
 const [selectedCatagories , setSelectedCatagories] = useState([])
 const [createDtaUI , setcreateDtaUI] = useState( <CreateAddons EditAbleItem={itemsModel} status = {false}/>)

  useEffect(()=>{
    if(selectedCatagories.length > 0){
      showDataByArrayQuers(setItems , "Addons" , selectedCatagories , "selectedCatagories")
    }else{
      showDataWithOutPagination(setItems , "Addons" )
    }
  },[selectedCatagories])
  
  const clearUi = () =>{
    setcreateDtaUI(<CreateAddons EditAbleItem={itemsModel} status = {false} />)
  }
  const handelEditDataUi = (item) =>{
    setcreateDtaUI(<CreateAddons EditAbleItem={item} status = {true} clearUi = {clearUi}  />)
  }

  const deleteItems = (itemsID , itemName) =>{
    if(window.confirm(`******************************************** \n\n Wait:= \n\n Do You Wanna Delete \n**"${itemName}"**\nAddons Item!!! \n\n ********************************************`)){
      delteColloctionInstance( itemsID ,"Addons")
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // gridTemplateColumns: "17.9vw auto",
        width: "100%",
        height: "100%",
        padding: "3%",
      }}
    >
     {createDtaUI}

      <Box>
      <Typography>
        Filter By Catagories
      </Typography>
      <SelectedCatagories selectedCatagories={selectedCatagories} setSelectedCatagories= {setSelectedCatagories}  />
      </Box>
      <Box>
        <List
          sx={{
            width: "100%",
            maxWidth: 400,
            marginTop: "5%",
            bgcolor: "secondary",
            position: "relative",
            overflow: "auto",
            color: "common.white",
            // maxHeight: 300,
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          {
            <ul>
              {
              items && items.map((doc) =>
              {
                const item = doc.data()
                item.id = doc.id
               return(
                <ListItem
                  key={item.id}
                  sx={{
                    backgroundColor: "secondary.dark",
                    marginBottom: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText primary={item.name} />
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Box>
                      <EditIcon
                        onClick = {()=> handelEditDataUi(item)}
                        sx={{
                          "&:hover": {
                            color: "secondary.light",
                            cursor: "pointer",
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <DeleteIcon
                      onClick = {() => deleteItems(item.id , item.name)}
                        sx={{
                          "&:hover": {
                            color: "secondary.light",
                            cursor: "pointer",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </ListItem>
              )})}
            </ul>
          }
        </List>
      </Box>
    </Box>
  );
};
export default Addons;
