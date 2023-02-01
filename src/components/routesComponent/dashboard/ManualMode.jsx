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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" align="center" mb={1}>
        Notice
      </Typography>

      <TextField
        value={forView.notice}
        onChange={onTextFieldChange}
        type="text"
        // focusColor='none'
        placeholder="your notice..."
        // fullWidth
        sx={{
          width: "400px",
          border: "1px solid white",
          // height: "10vh",
          input: {
            color: "white",
          },
        }}
      />
      {forView.manualModeResturentClosed == false ? (
        <Button
          onClick={closeTheResturent}
          fullWidth
          sx={{
            backgroundColor: "red",
            color: "#fff",
            marginTop: "10px",
            marginBottom: "5px",
          }}
        >
          Close The Resturent
        </Button>
      ) : (
        "The Resturent is Closed Now"
      )}
    </Box>
  );

}

export default ManualMode