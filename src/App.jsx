import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login'
import Background from './components/backGround';

const App=()=> {

  return (
    <>
    
    <Login />
    <Background/>
    <CssBaseline />
   </>
  )
}

export default App
