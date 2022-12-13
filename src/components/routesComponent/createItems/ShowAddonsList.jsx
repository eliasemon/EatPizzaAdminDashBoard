import { Box  , Typography} from '@mui/material'
import {useState , useEffect} from 'react'
import SelectedCatagories from '../../UI/SelectedCatagories'
import { showDataWithOutPagination , showDataByArrayQuers } from "../../../../utils";

const ShowAddonsList = ({selectedAddons , setSelectedAddons}) => {
    const [selectedCatagories , setSelectedCatagories] = useState([])
    const [items , setItems] = useState("")

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
        <Box>
            <Typography>
                Filter The Addons List By Catagories
            </Typography>
            <SelectedCatagories selectedCatagories={selectedCatagories} setSelectedCatagories={setSelectedCatagories} />
        </Box>
        {/* itemsLoader */}
        <Box>
            {items && <SelectedCatagories selectedCatagories={selectedAddons} setSelectedCatagories={setSelectedAddons} preAddedArray={items} /> }
        </Box>
    </Box>
  )
}
export default ShowAddonsList