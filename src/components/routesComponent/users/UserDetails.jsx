
import React from 'react'
import { Box, Button, Typography, } from '@mui/material/'
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import profileImg from '../../../assets/images/profile.jpg'

 const UserDetails = () => {

    const user = {
        Name : 'Tapu Mojumder',
        UserId:111,
        Avater:"kk",
        PhoneNumber:"0122555656",
        BanStatus:'false',
        UsercreationDate:Date(),
        OrderHistoryRef:"ref link",
        completedOrder:12,
        cancelOrder:4,
        TotalSpent:1200

    }

  return (
   
     <Box sx={{display:'flex', width : '60%',justifyContent:'center',alignItems:'center',background:'white',borderRadius:'1%'}}>
        <Box sx={{textAlign:'center',padding:'3%'}}>
            <img src={profileImg} width = {'140px'} height={'140px'} style={{borderRadius:"50%"}} />
            <Typography variant = 'h6' p={1}>{user.Name}</Typography>
            <Button variant='contained'>OrdersHistory</Button>
        </Box>
        <Box sx={{padding:'3%'}}>
            <Box sx={{display:'flex'}}>
                <Typography  sx={{fontWeight:'bold',color:'gray'}} >UserId:</Typography>
                <Typography  pl={1}>{user.UserId}</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
                <Typography  sx={{fontWeight:'bold',color:'gray'}} >phone number: </Typography>
                <Typography pl={1}> {user.PhoneNumber}</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
                <Typography  sx={{fontWeight:'bold',color:'gray'}} >BanStatus : </Typography>
                <Typography pl={1}> {user.BanStatus}</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
                <Typography  sx={{fontWeight:'bold',color:'gray'}} >creation Date:</Typography>
                <Typography pl={1}>{user.UsercreationDate}</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
                <Typography  sx={{fontWeight:'bold',color:'gray'}} >Total Completed Order:</Typography>
                <Typography pl={1}>{user.completedOrder}</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
                <Typography  sx={{fontWeight:'bold',color:'gray'}} >Total Cancel Order:</Typography>
                <Typography pl={1}>{user.cancelOrder}</Typography>
            </Box>
            <Box sx={{display:'flex'}}>
                <Typography sx={{fontWeight:'bold',color:'gray'}} >Total spend:</Typography>
                <Typography pl={1}>{user.TotalSpent}</Typography>
            </Box>
         
        </Box>
    </Box>


  )
}

export default UserDetails