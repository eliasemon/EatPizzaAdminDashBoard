import { Box } from '@material-ui/core'
import React from 'react'
import { LogoImg } from '../../assets/images'
import { Image } from '../UI/Image'


const LogoContainer = ({height , width}) => {
  return (
    <Box sx={{height : `${height}`,width : `${width}` , m : 0 , p : 0 }}  component="div">
        <Image src = {LogoImg} alt = "EatPizza"/>
    </Box>
  )
}

export default LogoContainer