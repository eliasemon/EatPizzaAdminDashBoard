import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {   showDataWithOutPagination , delteColloctionInstance} from "../../../../utils";
import { useEffect } from "react";
import CreateCatgories from "./createCatagories";

const cataGoryModel = {
  name : ""
}

const Categories = () => {

  const [showData , setShowData] = useState("")
  const [createDtaUI , setcreateDtaUI] = useState( <CreateCatgories EditAbleItem={cataGoryModel} status = {false}/>)

  useEffect(()=>{
    showDataWithOutPagination( setShowData ,"catagories")
  },[])

  const deleteItems = (itemsID , itemName) =>{
    if(window.confirm(`******************************************** \n\n Wait:= \n\n Do You Wanna Delete \n**"${itemName}"**\nCatagory Item!!! \n\n ********************************************`)){
      delteColloctionInstance( itemsID ,"catagories")
    }
    
  }
  const clearUi = () =>{
    setcreateDtaUI(<CreateCatgories EditAbleItem={cataGoryModel} status = {false} />)
  }
  const handelEditDataUi = (item) =>{
    setcreateDtaUI(<CreateCatgories EditAbleItem={item} status = {true} clearUi = {clearUi}  />)
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
      
     
      {
        createDtaUI
      }
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
              {showData && showData.map((doc) =>
              {
              const item = doc.data()
              item.id = doc.id ;
              return(
                <ListItem
                  key={doc.id}
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
                        onClick={() => deleteItems(doc.id , item.name)}
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
export default Categories;
