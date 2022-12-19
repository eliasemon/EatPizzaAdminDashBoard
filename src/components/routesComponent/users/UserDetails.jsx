
import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


 const UserDetails = () => {

    const user = {
        Name : 'jadu',
        UserId:111,
        Avater:"kk",
        PhoneNumber:"0122555656",
        BanStatus:true,
        UsercreationDate:Date(),
        OrderHistoryRef:"ref link",
        TotalSpent:1200
    }

  return (
   <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',background:'gray',color:'white'}}>
        <Box sx={{width:'20%',textAlign:"center"}}>
            <AccountCircleIcon fontSize="large" />
            <Typography>{user.Name}</Typography>
            <Button variant='contained'>OrdersHistory</Button>
        </Box>
        <Box sx={{width:'80%',textAlign:'left'}}>
            <Typography>User id:{user.UserId}</Typography>
            <Typography>phone number{user.PhoneNumber}</Typography>
            <Typography>BanStatus : {user.BanStatus}</Typography>
            <Typography>creation Date:{user.UsercreationDate}</Typography>
            <Typography>Total spend:{user.TotalSpent}</Typography>
        </Box>

   </Box>
  )
}

export default UserDetails