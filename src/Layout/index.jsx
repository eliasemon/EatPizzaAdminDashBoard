import { Box } from '@mui/system'
import React from 'react'
import { styled } from '@mui/system';
import Header from '../components/exploratoryElements/header';
import SideBar from '../components/exploratoryElements/sidebar';
import Routes from '../Routes';


const SidebarBox = styled('div')({
    width : "15vw",
    height : "93vh"
  });

const RoutesContentsBox = styled('div')({
    width : "80vw",
    height : "100%"
  });

const HeaderBox = styled('div')({
    width : "100vw",
    height : "7vh"
});


const Layout = () => {
  return (
    <Box components="div" sx={{width:"100vw" , height : "100vh"}}>
        <HeaderBox>
            <Header />
        </HeaderBox>
        <Box components="div" sx={{display : "flex" ,width:"100vw" }}>
            <SidebarBox>
                <SideBar />
            </SidebarBox>
            <RoutesContentsBox>
                <Routes />
            </RoutesContentsBox>
        </Box>
    </Box>    
  )
}

export default Layout
