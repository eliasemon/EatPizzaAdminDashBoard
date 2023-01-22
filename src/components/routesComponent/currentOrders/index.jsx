import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { HalfBox } from "../../UI/Shape.styled";
import TitleBar from "../../UI/TitleBar";
import { CurrentOrdersContainer,CardHeaderStyles } from "./CurrentOrders.styled";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderQuantity from "./OrderQuantity";
import CardComponent from "./Card";
import { showDataWithOutPagination , getSingleDataWithOutRealTimeUpdates , showDataForCurrentOrder } from "../../../../utils";

// const item =  data.variants[`${rawData.selectedVariant.id}`];



const CurrentOrders = () => {
  const [unHandleList , setUnHandleList] = useState("")
  const [unHandleOrderDocs , setUnHandleOrderDocs] = useState({})
  useEffect(()=>{
    showDataForCurrentOrder(setUnHandleList , "ordersList" , ["pending" , "inCoocked" , "picked" ] , "status" )
  },[])

  useEffect(()=>{
    if(unHandleList){
      const data = unHandleList.reduce(( acc , doc) => {
        const data = doc.data()
        data.id = doc.id;
        acc[`${data.id}`] = data
        return acc
      },{});

      setUnHandleOrderDocs((prv) => ({...prv , ...data}))
    }
  },[unHandleList])

if(unHandleList) console.log(unHandleList);
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
          {Object.keys(unHandleOrderDocs).map((key) =>{
            const el = unHandleOrderDocs[key]
            if(el.status !== "pending"){
              return ""
            }

          return(
            <CardComponent
              setUnHandleOrderDocs={setUnHandleOrderDocs}
              key={key}
              el={el}
              color="#1ec1fc"
            />
          )})}
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
          {Object.keys(unHandleOrderDocs).map((key) =>{
            const el = unHandleOrderDocs[key]
            if(el.status !== "inCoocked"){
              return ""
            }
            
          return(
            <CardComponent
              setUnHandleOrderDocs={setUnHandleOrderDocs}
              key={key}
              el={el}
              color="#1ec1fc"
            />
          )})}
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
          {Object.keys(unHandleOrderDocs).map((key) =>{
            const el = unHandleOrderDocs[key]
            if(el.status !== "picked"){
              return ""
            }
            
          return(
            <CardComponent
              setUnHandleOrderDocs={setUnHandleOrderDocs}
              key={key}
              el={el}
              color="#1ec1fc"
            />
          )})}
        </Box>
      </HalfBox>
    </CurrentOrdersContainer>
  );
};

export default CurrentOrders;
