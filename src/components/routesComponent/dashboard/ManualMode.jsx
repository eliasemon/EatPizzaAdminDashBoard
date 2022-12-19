import React from 'react'
import {   Button , TextField ,  Box , Typography  , FormControlLabel , Switch  } from '@mui/material'
import { setDataToCollection} from '../../../../utils'; 

const ManualMode = ({forView , setForView}) => {



    const onTextFieldChange =(e) =>{
        e.preventDefault()
        setForView(prv => ({...prv , notice : e.target.value}))
    }
    const closeTheResturent = () =>{
        const data = {...forView}
        data.manualModeResturentClosed = true;
        data.automaticMode = false;
        setDataToCollection(data , "ResturentOpeningHr" , false)
    }

  return (
    <Box>
        <hr/>
        <hr/>
        <hr/>
        <hr/>
        <Typography>
            Notice
        </Typography>
        <TextField value={forView.notice} onChange={onTextFieldChange} type="text" />
        {
            forView.manualModeResturentClosed == false ? (<Button onClick={closeTheResturent} sx={{backgroundColor : "red" , color : "#fff"}}>
            Close The Resturent
        </Button>) : "The Resturent is Closed Now"
        }
        
    </Box>
  )
}

export default ManualMode