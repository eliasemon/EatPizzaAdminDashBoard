import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { HalfBox } from "../../UI/Shape.styled";
import TitleBar from "../../UI/TitleBar";
import {
  CurrentOrdersContainer,
  CardHeaderStyles,
} from "./CurrentOrders.styled";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import product from "../../../assets/images/product2.png";
import OrderQuantity from "./OrderQuantity";
import { getFirestore , doc , updateDoc} from "firebase/firestore";
import { delteColloctionInstanceWithOutLoadingAnimation } from "../../../../utils";

const orderStatusChanged = {
  pending : "inCoocked",
  inCoocked : "picked",
  picked : "compleate"

}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const Header = ({ name, orderId, mobile }) => {
  return (
    <Box sx={{ padding: "8px 4px", color: "lightgray" }}>
      <Typography fontSize="22px">{mobile}</Typography>
      <Typography color="#c8c8c8">{name}</Typography>
      <Typography color="#c8c8c8">{orderId}</Typography>
    </Box>
  );
};

const CardComponent = ({ el, setUnHandleOrderDocs, color }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const db = getFirestore()
  const colRef = doc(db, "ordersList" , `${el.id}` );
  const onClickButtonHandler = async () => {
    await updateDoc( colRef ,{status : orderStatusChanged[el.status]})
    if(el.status === "picked"){
      delteColloctionInstanceWithOutLoadingAnimation(el.id , "unHandleOrdersIds")
      setUnHandleOrderDocs((prv) =>{
        delete prv[el.id]
        return {...prv}
      })
    }else{
      setUnHandleOrderDocs((prv) =>{
        prv[el.id].status =  orderStatusChanged[el.status]
        return {...prv}
      })
    }
  };
  const declineOrder = async (type) =>{
     await updateDoc( colRef ,{status : type})
      delteColloctionInstanceWithOutLoadingAnimation(el.id , "unHandleOrdersIds")
      setUnHandleOrderDocs((prv) =>{
        delete prv[el.id]
        return {...prv}
      })
  }
  // console.log("pend", pendingDummyArr);

  if(!el.isValided){
    return (
      <Box>
        <CardHeaderStyles>
          <Header name={el.userName} orderId={el.id} mobile={el?.userPhoneNumber} />
          <Box>
            <Typography> Order has Some issue </Typography>
            <Button onClick={() => declineOrder("Manipulated")}>Decline the Oreder</Button>
          </Box>
        </CardHeaderStyles>
      </Box>
    )
  }
  return (
    <Card
      sx={{
        borderTop: `1px solid ${color}`,
        margin: "5px 5px 15px 5px",
        padding: "10px",
      }}
    >
      <CardHeaderStyles onClick={handleExpandClick} sx={{cursor : "pointer"}} >
        <Header name={el.userName} orderId={el.id} mobile={el?.userPhoneNumber} />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ fontSize: "36px", color: "lightgray" }} />
        </ExpandMore>
      </CardHeaderStyles>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {Object.keys(el.items).map((key) => (
          <OrderQuantity key ={key} product={el.items[key]} />
        ))}
        <Box
          sx={{
            disply: "flex",
            flexDirection: "row",
            padding: "10px",
            marginTop: "20px",
            marginBottom: "5px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">Subtotal</Typography>
            <Typography color="white">৳ {el.subTottal}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">Delivery And Other Cost</Typography>
            <Typography color="white">৳ {el.totalExtraCost}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">- Discount</Typography>
            <Typography color="white"> -{el.discountAmmount}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">Total</Typography>
            <Typography color="white">৳ {el.TotalOrderAmmount}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">Payment Method</Typography>
            <Typography color="white">{el.paymentType}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">Shiping Address</Typography>
            <Typography color="white">{el.shipingAddress}</Typography>
          </Box>
        </Box>
        <Button onClick={() => declineOrder("cancel")}>Cancel</Button>
        <Button
          onClick={onClickButtonHandler}
          mt={1}
          variant="contained"
          fullWidth
        >
          PROCESS TO NEXT
        </Button>
      </Collapse>
    </Card>
  );
};
export default CardComponent;
