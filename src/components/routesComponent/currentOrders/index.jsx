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
import { showDataWithOutPagination , getSingleDataWithOutRealTimeUpdates } from "../../../../utils";

// const item =  data.variants[`${rawData.selectedVariant.id}`];

const validateData = async (rawData , extraCostDocs) =>{
  if(rawData.isChecked){
    return rawData.isValided
  }
  let subTottal = 0
  let exTraCost = 0
  const keys =  Object.keys(rawData.items);
  
  const itemsPromise = keys.map( async (v)=>{
    const doc = rawData.items[`${v}`]
    const data = await getSingleDataWithOutRealTimeUpdates("productlist" , doc.id )
    const item =  data.variants[`${doc.selectedVariant.id}`];
    subTottal +=  Number(item.sellingPrice)
    const AddonsIds = Object.keys(doc.selectedAddonsForCard)
    const AddonsPromise = AddonsIds.map( async (id)=>{
      const data = await getSingleDataWithOutRealTimeUpdates("Addons" , id )
      subTottal +=  Number(data.price)
    })
    await Promise.all(AddonsPromise).then(() => {
      subTottal = (Number(subTottal) * Number(doc.itemCount))
    })
  })
  await Promise.all (itemsPromise).then(()=>{
    extraCostDocs.map((doc) => {
      const data = doc.data()
      if(data.costType === "taka" ){
        exTraCost+= Number(data.costValue)
      }else{
        const temp =  (subTottal / 100) * Number(data.costValue)
        exTraCost+= temp
      }
    })
  })
  let discount = 0
  if(rawData.promoCode){
  const promoData = await  getSingleDataWithOutRealTimeUpdates("promoCode" , rawData.promoCode)
  if(promoData.discountType === "%" && promoData.conditionAmmount <=  subTottal){
    discount = (subTottal / 100) * Number(promoData.discountValue)
  }else if(promoData.discountType === "taka" && promoData.conditionAmmount <=  subTottal){
    discount = Number(promoData.conditionAmmount)
  }
}

  if(Number(rawData.TotalOrderAmmount) === (subTottal + exTraCost - discount)){
    console.log(subTottal + exTraCost - discount)
    return true
  }else{
    return false
  }

  


 
}


const CurrentOrders = () => {
  const [forceRender,setForceRender]=useState(false)
  const [unHandleList , setUnHandleList] = useState("")
  const [unHandleOrderDocs , setUnHandleOrderDocs] = useState({})
  const [extraCostDocs , setExtraCostDocs] = useState("")
  useEffect(()=>{
    showDataWithOutPagination(setUnHandleList , "unHandleOrdersIds")
    showDataWithOutPagination(setExtraCostDocs , "extraCost")
  },[])

  useEffect(()=>{
    if(unHandleList && extraCostDocs){
      unHandleList.forEach(async (v) => {
        const data = await getSingleDataWithOutRealTimeUpdates("ordersList" , v.id)
        data.isValided = await validateData(data , extraCostDocs )
        data.isChecked = true;
        console.log("SomeThings WentWorg")
        setUnHandleOrderDocs((prv) => {
            prv[`${data.id}`] = data
            return {...prv}
        })
      });
      
    }
  },[unHandleList , extraCostDocs])
if(unHandleOrderDocs) console.log(unHandleOrderDocs);
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
