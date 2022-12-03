
import { Box } from '@mui/material';
import React from 'react'
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';
 const Dashboard = () => {
  return (
   <Box sx={{display:'grid' ,  gridTemplateColumns : "30% 70%" , width:'100%', height:'100%'}}>
       <LeftContainer />
       <RightContainer />
   </Box>
  )
}
export default Dashboard;