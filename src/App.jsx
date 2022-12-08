import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./pages/Login";
import Background from "./components/backGround";
import Layout from "./Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./constants/theme";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  console.log({ theme });

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Login /> */}
        <BrowserRouter>
          <Layout />
          <Background />
          <CssBaseline />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
