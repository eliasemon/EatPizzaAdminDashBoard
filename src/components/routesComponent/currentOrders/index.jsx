import { Box, Button } from "@mui/material";
import { useState } from "react";
import { HalfBox } from "../../UI/Shape.styled";
import TitleBar from "../../UI/TitleBar";
import { CurrentOrdersContainer,CardHeaderStyles } from "./CurrentOrders.styled";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderQuantity from "../createItems/OrderQuantity";
import { pendingDummyArr,cookingDummyArr,readyDummyArr } from "./Card";
import CardComponent from "./Card";





const CurrentOrders = () => {
  const [forceRender,setForceRender]=useState(false)
  return (
    <CurrentOrdersContainer>
      <HalfBox color="blue">
        <TitleBar title="PENDING" color="blue" />
        <Box
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {pendingDummyArr.map((el, index) => (
            <CardComponent
              setForceRender={setForceRender}
              key={index}
              el={el}
              color="#1ec1fc"
            />
          ))}
        </Box>
      </HalfBox>

      <HalfBox color="orange">
        <TitleBar title="COOKING" color="orange" />
        <Box
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {cookingDummyArr.map((el, index) => (
            <CardComponent key={index} el={el} color="#fc591e" />
          ))}
        </Box>
      </HalfBox>

      <HalfBox color="green">
        <TitleBar title="READY" color="green" />
        <Box
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {readyDummyArr.map((el, index) => (
            <CardComponent key={index} el={el} color="#1efcc8" />
          ))}
        </Box>
      </HalfBox>
    </CurrentOrdersContainer>
  );
};

export default CurrentOrders;
