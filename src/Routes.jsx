import { Box } from '@mui/system'
import React from 'react'
import Dashboard from './components/routesComponent/dashboard/index';

const Routes = () => {
  return (
     <Box sx = {{ pt : "1.5vw" , pl: "1.5vw" , boxSizing: "border-box" ,width:'100%', height:'100%'}}>
      
      <Dashboard />
     </Box>
  )
}

export default Routes
