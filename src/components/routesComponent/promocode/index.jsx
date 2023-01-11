import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {   showDataWithOutPagination , delteColloctionInstance} from "../../../../utils";
import { useEffect } from "react";
import CreatePromoCode from "./CreatePromoCode";
import { PromocodeContainer } from "./Promocode.styled";
import { CategoryList, HalfBox, ListElement } from "./../../UI/Shape.styled";
import TitleBar from "./../../UI/TitleBar";
import { FilterSection } from "../addons/Addons.styled";
import FilterView from "./../../UI/FilterView";
import CreateAddons from "./../banner/CreateBanner";
import ExtraCostCreation from "./ExtraCostCreation";

const promoCodeModel = {
  name: "",
  description: "",
  discountType: "",
  discountValue: "",
  validity: "",
  howManyTimesUsed: "",
  conditionAmmount: 0,
};
const ExtraCostCodeModel = {
  name: "",
  description: "",
  costType: "",
  costValue: "",
};

const PromoCode = () => {
  const [showData, setShowData] = useState("");
  const [extraCostShowData , setExtraCostShowData] = useState("");
  const [createDtaUI, setcreateDtaUI] = useState(
    <CreatePromoCode EditAbleItem={promoCodeModel} status={false} />
  );
  const [createExtraCostUI, setcreateExtraCostUI] = useState(
    <ExtraCostCreation EditAbleItem={ExtraCostCodeModel} status={false} />
  );

  useEffect(() => {
    showDataWithOutPagination(setShowData, "promoCode");
    showDataWithOutPagination(setExtraCostShowData, "extraCost");
  }, []);

  const deleteItems = (itemsID, itemName , type) => {
    if (
      window.confirm(
        `******************************************** \n\n Wait:= \n\n Do You Wanna Delete \n**"${itemName}"**\PromoCode Item!!! \n\n ********************************************`
      )
    ) {
      if(type === "extraCost"){
        delteColloctionInstance(itemsID, "extraCost");
        return
      }
      delteColloctionInstance(itemsID, "promoCode");
    }
  };
  const clearUi = (type) => {
    if(type === "extraCost"){
      setcreateExtraCostUI(
        <ExtraCostCreation EditAbleItem={ExtraCostCodeModel} status={false} />
      )
      return
    }
    setcreateDtaUI(
      <CreatePromoCode EditAbleItem={promoCodeModel} status={false} />
    );
  };
  const handelEditDataUi = (item , type) => {
    if(type === "extraCost"){
      setcreateExtraCostUI( 
        <ExtraCostCreation EditAbleItem={item} status={true} clearUi={clearUi} />
      ) 
      return
    }
    
    setcreateDtaUI(
      <CreatePromoCode EditAbleItem={item} status={true} clearUi={clearUi} />
      );

  };

  // code stolen from addons

  return (
    <PromocodeContainer>
      <HalfBox color="blue">
        <TitleBar title="Promocode Section" color="blue" />
        {createDtaUI}

           <Box>
              <List
                 sx={{
                   width: "100%",
                   maxWidth: 400,
                   marginTop: "5%",
                   bgcolor: "secondary",
                   position: "relative",
                   overflow: "auto",
                   color: "common.white",
                   // maxHeight: 300,
                   "& ul": { padding: 0 },
                 }}
                 subheader={<li />}
               >
                 {
                   <ul>
                     {showData && showData.map((doc) =>
                     {
                     const item = doc.data()
                     item.id = doc.id ;
                     return(
                       <ListItem
                         key={doc.id}
                         sx={{
                           backgroundColor: "secondary.dark",
                           marginBottom: "5px",
                           borderRadius: "5px",
                         }}
                       >
                         <ListItemText primary={item.name} />
                         <Box sx={{ display: "flex", gap: "10px" }}>
                           <Box>
                             <EditIcon
                               onClick = {()=> handelEditDataUi(item)}
                               sx={{
                                 "&:hover": {
                                   color: "secondary.light",
                                   cursor: "pointer",
                                 },
                               }}
                             />
                           </Box>
                           <Box>
                             <DeleteIcon
                               onClick={() => deleteItems(doc.id , item.name)}
                               sx={{
                                 "&:hover": {
                                   color: "secondary.light",
                                   cursor: "pointer",
                                 },
                               }}
                             />
                           </Box>
                         </Box>
                       </ListItem>
                     )})}
                   </ul>
                 }
               </List>
          </Box>

      </HalfBox>
      <HalfBox color="green">
        <TitleBar title="Extra Cost" color="green" />
        {createExtraCostUI}

           <Box>
              <List
                 sx={{
                   width: "100%",
                   maxWidth: 400,
                   marginTop: "5%",
                   bgcolor: "secondary",
                   position: "relative",
                   overflow: "auto",
                   color: "common.white",
                   // maxHeight: 300,
                   "& ul": { padding: 0 },
                 }}
                 subheader={<li />}
               >
                 {
                   <ul>
                     {extraCostShowData && extraCostShowData.map((doc) =>
                     {
                     const item = doc.data()
                     item.id = doc.id ;
                     return(
                       <ListItem
                         key={doc.id}
                         sx={{
                           backgroundColor: "secondary.dark",
                           marginBottom: "5px",
                           borderRadius: "5px",
                         }}
                       >
                         <ListItemText primary={item.name} />
                         <Box sx={{ display: "flex", gap: "10px" }}>
                           <Box>
                             <EditIcon
                               onClick = {()=> handelEditDataUi(item , "extraCost")}
                               sx={{
                                 "&:hover": {
                                   color: "secondary.light",
                                   cursor: "pointer",
                                 },
                               }}
                             />
                           </Box>
                           <Box>
                             <DeleteIcon
                               onClick={() => deleteItems(doc.id , item.name , "extraCost")}
                               sx={{
                                 "&:hover": {
                                   color: "secondary.light",
                                   cursor: "pointer",
                                 },
                               }}
                             />
                           </Box>
                         </Box>
                       </ListItem>
                     )})}
                   </ul>
                 }
               </List>
          </Box>
      </HalfBox>
    </PromocodeContainer>
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     // gridTemplateColumns: "17.9vw auto",
    //     width: "100%",
    //     height: "100%",
    //     padding: "3%",
    //   }}
    // >

    //   {
    //     createDtaUI
    //   }
    //   <Box>
    //     <List
    //       sx={{
    //         width: "100%",
    //         maxWidth: 400,
    //         marginTop: "5%",
    //         bgcolor: "secondary",
    //         position: "relative",
    //         overflow: "auto",
    //         color: "common.white",
    //         // maxHeight: 300,
    //         "& ul": { padding: 0 },
    //       }}
    //       subheader={<li />}
    //     >
    //       {
    //         <ul>
    //           {showData && showData.map((doc) =>
    //           {
    //           const item = doc.data()
    //           item.id = doc.id ;
    //           return(
    //             <ListItem
    //               key={doc.id}
    //               sx={{
    //                 backgroundColor: "secondary.dark",
    //                 marginBottom: "5px",
    //                 borderRadius: "5px",
    //               }}
    //             >
    //               <ListItemText primary={item.name} />
    //               <Box sx={{ display: "flex", gap: "10px" }}>
    //                 <Box>
    //                   <EditIcon
    //                     onClick = {()=> handelEditDataUi(item)}
    //                     sx={{
    //                       "&:hover": {
    //                         color: "secondary.light",
    //                         cursor: "pointer",
    //                       },
    //                     }}
    //                   />
    //                 </Box>
    //                 <Box>
    //                   <DeleteIcon
    //                     onClick={() => deleteItems(doc.id , item.name)}
    //                     sx={{
    //                       "&:hover": {
    //                         color: "secondary.light",
    //                         cursor: "pointer",
    //                       },
    //                     }}
    //                   />
    //                 </Box>
    //               </Box>
    //             </ListItem>
    //           )})}
    //         </ul>
    //       }
    //     </List>
    //   </Box>
    // </Box>
  );
};
export default PromoCode;
