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
import { findTheResturentStatus } from "../utils/ResturentOpenCloseStatus";
import { showDataWithOutPagination } from "../utils";

const App = () => {

  const [resturentOpenClosedData , setResturentOpenClosedData] = useState("")
  const [openingStatus , setOpeningStatus] = useState("")
  useEffect(() => {
    showDataWithOutPagination(setResturentOpenClosedData, "ResturentOpeningHr")
  }, []);
  useEffect(() => {
    if(resturentOpenClosedData.length > 0)
    setOpeningStatus(findTheResturentStatus(resturentOpenClosedData[0].data()))
  }, [resturentOpenClosedData]);



  const [ui, setUi] = useState(
    
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
        <Background>
        <BrowserRouter>
          <Layout openingStatus={openingStatus}  />
        </BrowserRouter>
          <CssBaseline />
          <ToastContainer theme="dark" />
        </Background>
      </ThemeProvider>
    </>
  );
};

export default App;
