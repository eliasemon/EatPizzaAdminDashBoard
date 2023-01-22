import { useState , useEffect, useRef } from "react";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./Layout";
import theme from "./constants/theme";

import Background from "./components/backGround";

import { auth } from "../firebaseConfig";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./pages/Login";
const App = () => {

  const [ui, setUi] = useState("");
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setUi(
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        )
      }else{
        setUi(<Login />)
      }
    })
  },[])
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Background>
          {ui}
          <CssBaseline />
          <ToastContainer theme="dark" />
        </Background>
      </ThemeProvider>
    </>
  );
};

export default App;
