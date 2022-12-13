import { Box  , Button , Typography} from '@mui/material'
import {useState} from 'react'
import SelectedCatagories from './SelectedCatagories'

const HandleView = ({selectedCatagories , setSelectedCatagories , filterHandeler , heading} ) =>{
    return (
        <Box>
             <Typography>{heading}</Typography>
            
             <SelectedCatagories
                selectedCatagories={selectedCatagories}
                setSelectedCatagories={setSelectedCatagories}
            />

            <Button variant="contained" onClick={filterHandeler}>
                Clear Filter
            </Button>
        </Box>
    )
    
}


const FilterView = ({clearFilterfun , selectedCatagories , setSelectedCatagories , heading }) => {
    const [flag , setFlag] = useState(false)    

    const filterHandeler = () =>{
        clearFilterfun()
        setFlag(false)
    }

    if(flag){
        return(
            <HandleView selectedCatagories = {selectedCatagories}  setSelectedCatagories ={setSelectedCatagories}  filterHandeler ={filterHandeler}  heading = {heading}  />
        )
    }

  return (
    <Box>
        <Button variant="contained" onClick={() =>  setFlag(true)}> Filter The View </Button>
    </Box>
  )
}
export default FilterView
