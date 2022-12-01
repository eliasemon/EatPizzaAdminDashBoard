import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login'
import Background from './components/backGround';
import Layout from './Layout';
const App=()=> {

  return (
    <>
    
    {/* <Login /> */}
    <Layout />
    <Background/>
    <CssBaseline />
   </>
  )
}

export default App
