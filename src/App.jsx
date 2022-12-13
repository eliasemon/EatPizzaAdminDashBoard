import { useState } from "react";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./Layout";
import theme from "./constants/theme";

import Background from "./components/background";

import { BrowserRouter } from "react-router-dom";
import { auth } from "../firebaseConfig";

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";



const App = () => {
  const [ui, setUi] = useState(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
  // auth.onAuthStateChanged(user=>{
  //   if(user){
  //     setUi(
  //       <BrowserRouter>
  //         <Layout />
  //       </BrowserRouter>
  //     )
  //   }else{
  //     setUi(<Login />)
  //   }
  // })
  return (
    <>
      <ThemeProvider theme={theme}>
        {ui}
        <Background />
        <CssBaseline />
        <ToastContainer theme="dark" />
      </ThemeProvider>
    </>
  );
};

export default App;
