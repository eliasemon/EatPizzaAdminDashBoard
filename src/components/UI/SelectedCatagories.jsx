import {useState , useEffect} from 'react'
import { showDataWithOutPagination } from '../../../utils'
import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";

import { SelectCategoriesStyle } from "./SelectedCategories.styled";


const ForSelectUI = ({itemsObj}) =>{



  return (
    <Box>
      <Typography>{itemsObj.name}</Typography>
      {itemsObj.price && (<Typography>Price : {itemsObj.price }</Typography>)}

    </Box>
  )
}



const SelectedCatagories = ({setSelectedCatagories , selectedCatagories , collectionRef , preAddedArray }) => {
  const [catagoriesSelectionView , setCatagoriesSelectionView] = useState("")
    
    useEffect(()=>{
      if(preAddedArray){
        setCatagoriesSelectionView([...preAddedArray])
      }else if(collectionRef){
          showDataWithOutPagination(setCatagoriesSelectionView , `${collectionRef}`)
      }else{
          showDataWithOutPagination(setCatagoriesSelectionView , "catagories")
      }
      },[preAddedArray])


  const checkBoxHandleChange = (index, id) => {
    if (index == -1) {
      setSelectedCatagories((prv) => [...prv, id]);
      return;
    }
    setSelectedCatagories((prv) => {
      prv.splice(index, 1);
      return [...prv];
    });
  };
  return (
    <SelectCategoriesStyle>
      {catagoriesSelectionView &&
        catagoriesSelectionView.map((doc) => {
          const item = doc.data();
          item.id = doc.id;
          const index = selectedCatagories.findIndex((v) => v == item.id);
          return (
            <FormControlLabel
              sx={{padding:'2px'}}
              key={item.id}
              label={<ForSelectUI key={item.id} itemsObj={item} />}
              control={
                <Checkbox
                  sx={{
                    color: "#989898",
                  }}
                  checked={index !== -1}
                  // indeterminate={checked[0] !== checked[1]}
                  onChange={() => checkBoxHandleChange(index, item.id)}
                />
              }
            />
          );
        })}
    </SelectCategoriesStyle>
  );
};



export default SelectedCatagories
