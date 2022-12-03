
import { Box } from '@mui/material';
import React from 'react'
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';
 const Dashboard = () => {
  return (
   <Box sx={{display:'flex' ,width:'100vw', height:'100vh'}}>
    
          <LeftContainer />
       
          <RightContainer />

   </Box>
  )
}
export default Dashboard;