import { Box } from '@mui/system'
import React from 'react'
import LogoContainer from '../logoContainer'

LogoContainer
const Header = () => {
  
  return (
    <Box bgcolor="primary.main" sx={{width : "100%" , height : "100%", color:"white", display:'flex', justifyContent:'space-between',alignItems:'center'}} >
        <Box>
          <LogoContainer height={"50px"} width={"50px"} />
        </Box>
        <Box>logged in as Admin</Box>
    </Box>
  )
}
export default Header
