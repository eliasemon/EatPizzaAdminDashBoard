import { Box} from "@mui/material";
import { useEffect, useState } from "react";
import { HalfBox } from "../../UI/Shape.styled";
import TitleBar from "../../UI/TitleBar";
import { CurrentOrdersContainer} from "./CurrentOrders.styled";

import Typography from '@mui/material/Typography';

import CardComponent from "./Card";
import {showDataForCurrentOrder } from "../../../../utils";




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

  return (
    <CurrentOrdersContainer>

      {( (unHandleList !== "" )&& ( Object.keys(unHandleOrderDocs).length === 0 )) && (
        <Box sx={{top : "10%" , display : "flex" , justifyContent : "center"  , width : "100%" ,position : "absolute" , color : "#fff"}}>
            <Typography sx={{ fontSize : 40 , padding : "10px" , borderRadius : "10px" , backgroundColor : "rgba(0,0,0,0.5)" }}>No Current Orders To Handel </Typography>
        </Box>
      )}
      
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

          {Object.keys(unHandleOrderDocs).map((key) => {
            const el = unHandleOrderDocs[key];
            if (el.status !== "pending") {
              return "";
            }

            return (
              <CardComponent
                setUnHandleOrderDocs={setUnHandleOrderDocs}
                key={`${key}Pending`}
                el={el}
                color="#1ec1fc"
              />
            );
          })}
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
          {Object.keys(unHandleOrderDocs).map((key) => {
            const el = unHandleOrderDocs[key];
            if (el.status !== "inCoocked") {
              return "";
            }

            return (
              <CardComponent
                setUnHandleOrderDocs={setUnHandleOrderDocs}
                key={`${key}inCoocked`}
                el={el}
                color="#1ec1fc"
              />
            );
          })}
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
          {Object.keys(unHandleOrderDocs).map((key) => {
            const el = unHandleOrderDocs[key];
            if (el.status !== "picked") {
              return "";
            }

            return (
              <CardComponent
                setUnHandleOrderDocs={setUnHandleOrderDocs}
                key={`${key}picked`}
                el={el}
                color="#1ec1fc"
              />
            );
          })}
        </Box>
      </HalfBox>
    </CurrentOrdersContainer>
  );
};

export default CurrentOrders;
