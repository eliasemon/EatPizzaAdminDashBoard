
import { Box } from '@mui/material';
import React from 'react'
import LeftContainer from './LeftContainer';
import RightContainer from './LeftContainer';
 const Dashboard = () => {
  return (
   <Box sx={{display:'flex' ,width:'100%', height:'100%'}}>
    
          <LeftContainer flexgrow={1}/>
       
          <RightContainer flexgrow = {2}/>

   </Box>
  )
}
export default Dashboard;