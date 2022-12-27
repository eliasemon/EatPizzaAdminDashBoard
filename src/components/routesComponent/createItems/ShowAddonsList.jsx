import { Box  , Typography , Button} from '@mui/material'
import {useState , useEffect} from 'react'
import SelectedCatagories from '../../UI/SelectedCatagories'
import { showDataWithOutPagination , showDataByArrayQuers } from "../../../../utils";
import FilterView from '../../UI/FilterView';

const ShowAddonsList = ({selectedAddons , setSelectedAddons ,  selectedCatagories} ) => {
    // const [selectedCatagories , setSelectedCatagories] = useState([])

    const [items , setItems] = useState("")

    const ViewChange = (type) => {

      if(type == "filtered") {
        console.log("Working Fine")
        if(selectedCatagories.length > 0){
          showDataByArrayQuers(setItems , "Addons" , selectedCatagories , "selectedCatagories")
        }
        return
      }
        showDataWithOutPagination(setItems , "Addons" )
        return
    }

    useEffect(()=>{
        if(selectedCatagories.length > 0){
          showDataByArrayQuers(setItems , "Addons" , selectedCatagories , "selectedCatagories")
        }else{
          showDataWithOutPagination(setItems , "Addons" )
        }
      },[selectedCatagories])
  return (
    <Box>

                    {/* for Addons Filtering  */}
                    {/* <Box>
                      <FilterView  
                          selectedCatagories={selectedCatagories}
                          setSelectedCatagories={setSelectedCatagories}
                          clearFilterfun = {clearFilterfun}
                          heading = "Filter The Addons List By Catagories"
                        />
                    </Box> */}


        {/* itemsLoader */}

        {/* Naviagate Button  */}
        <Box sx={{display : "flex"}}>
          <Button onClick={() => ViewChange("filtered")}>Defualt Filtered</Button>
          <Button onClick={ViewChange}>All</Button>
        </Box>
        <Box>
            {items && <SelectedCatagories selectedCatagories={selectedAddons} setSelectedCatagories={setSelectedAddons} preAddedArray={items} /> }
        </Box>
    </Box>
  )
}
export default ShowAddonsList