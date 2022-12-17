import { Box , Button  } from '@mui/material'

import {useEffect, useState} from 'react'
import { RightContainer } from './Dashboard.styled'

import { showDataWithOutPagination , addDataToCollection , setDataToCollection} from '../../../../utils';
import AutometicTimeChange from './AutometicTimeChange';
import  ManualMode  from './ManualMode';
import SkeletoneForDashBoardRightContainer from '../../UI/skeletone/SkeletoneForDashBoardRightContainer';

const dataModel = {
  id : "openingAndClosingData",
  name : "ResturentOpeningHr",
  automaticMode : true,
  openingHR : 7,
  closingHR : 20,
  manualModeResturentClosed : false,
  notice : "",
  serviceTimeZone : "GMT+0600"
} 

const RightContainerMain = () => {
  const [data , setData] = useState("")
  const [forView , setForView] = useState("")


  useEffect(()=>{
    showDataWithOutPagination(setData , "ResturentOpeningHr").then((length) =>{
        if(length == 0){
          setDataToCollection(dataModel , "ResturentOpeningHr" , false)
        }
    })
  },[])


  useEffect(()=>{
    if(data.length > 0){
      setForView({ ...data[0].data()})
    }
  },[data])
  
  const openResturent = () =>{
    const data = {...forView}
    data.manualModeResturentClosed = false;
    setDataToCollection(data , "ResturentOpeningHr" , false)
  }

  if(!forView){
    return ( <SkeletoneForDashBoardRightContainer /> )
  }
  return (
    <RightContainer>
      {
        forView.manualModeResturentClosed && (
          <Box sx={{ zIndex : 40 , display : "flex" ,justifyContent : "center" ,
          alignItems : "center", background : "rgba(255,255,255,0.1)"  , 
          position : "absolute" , top : 0 , left : 0, height : "100%" , width : "100%"}}>
            <Button variant='contained' onClick={openResturent} > Open The Resturent </Button>
          </Box>
        )
      }

      <Box sx={{height : "100%" , width : "100%"  , zIndex : 30}}>
        <AutometicTimeChange  data={data[0].data()} forView={forView} setForView={setForView}  />
        <ManualMode forView = {forView}  setForView = {setForView} />
      </Box>
        
    </RightContainer>    
  )
}
export default RightContainerMain