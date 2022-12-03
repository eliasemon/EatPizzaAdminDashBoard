import React from 'react'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

import { Icon } from '@mui/material';


 const Boxes =({icon,h3typo,h2typo,fullWidth})=> {

  return (
    <Box sx = {{ width:fullWidth?'260px':'130px', height: '130px',textAlign:'center',border:'2px solid gray'}}>
    {icon}
    <Typography variants = 'h3'>{h3typo}</Typography>
    
    <Typography variants = 'h2'>{h2typo}</Typography>
    </Box>
  )
}
export default Boxes 