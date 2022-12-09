import {
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
const addonsList = [
  {
    id: "1",
    title: "Burger",
  },
  {
    id: "2",
    title: "Pizza",
  },
  {
    id: "3",
    title: "Sandwich",
  },
  {
    id: "4",
    title: "Coffee",
  },
  {
    id: "5",
    title: "Juice",
  },
  {
    id: "6",
    title: "Kacchi",
  },
  {
    id: "7",
    title: "Biriyani",
  },
  {
    id: "8",
    title: "Khichuri",
  },
  {
    id: "9",
    title: "Tehari",
  },
];
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import CreateAddons from "./createAddons";
// import { showDataWithPagination } from "../../../../utils";




const Addons = () => {
 const [data , setData] = useState("")



  useEffect(()=>{
    // showDataWithPagination(setData , "Addons" , 0 , 10)
    
  },[])

  if(data){
    // console.log(data.docs.length)
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
      <CreateAddons />

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
              
              addonsList.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    backgroundColor: "secondary.dark",
                    marginBottom: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText primary={item.title} />
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
              ))}
            </ul>
          }
        </List>
      </Box>
    </Box>
  );
};
export default Addons;
