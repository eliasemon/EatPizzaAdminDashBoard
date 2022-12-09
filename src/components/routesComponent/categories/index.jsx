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


const Categories = () => {

  const [showData , setShowData] = useState("")

  useEffect(()=>{
    showDataWithOutPagination( setShowData ,"catagories")
  },[])

  const deleteItems = (itemsID) =>{
    if(window.confirm(`******************************************** \n\n Wait:= \n\n Do You Wanna Delete "${itemsID}" Catagory Item!!! \n\n ********************************************`)){
      delteColloctionInstance( itemsID ,"catagories")
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
      
      <CreateCatgories />

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
                        onClick={() => deleteItems(doc.id)}
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
