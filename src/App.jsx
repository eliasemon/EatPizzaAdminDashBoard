import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login'
import Background from './components/backGround';
import Layout from './Layout';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


const App=()=> {

  console.log({theme})
 
  return (
    <>
   <ThemeProvider theme={theme}> 
    {/* <Login /> */}
    <Layout />
    <Background/>
    <CssBaseline />

    </ThemeProvider>
   </>
  )
}

export default App
