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
import OrderQuantity from "../createItems/OrderQuantity";
import product from "../../../assets/images/product2.png";

export let pendingDummyArr = [
  {
    name: "Elias Emon",
    orderId: "#44423",
    mobile: "01920143161",
    paymentStatus: "Cash On Delivery",
    total: 320,
    comments: "tumi jemne paro randho ami khaite parlei chole",
    products: [
      {
        image: product,
        text: "Wow! That looks delicious",
        price: "305",
        qty: "2",
      },
      {
        image: product,
        text: "Wow! ",
        price: "80",
        qty: "1",
      },
      {
        image: product,
        text: "Wow! delicious",
        price: "95",
        qty: "3",
      },
    ],
  },

  {
    name: "Mr Azizul",
    orderId: "#12346",
    mobile: "01920145175",
    paymentStatus: "Cash On Delivery",
    total: 820,
    comments: "",
    products: [
      {
        image: product,
        text: "jhal fried",
        price: "305",
        qty: "10",
      },
      {
        image: product,
        text: "Wow! ",
        price: "10",
        qty: "34",
      },
      {
        image: product,
        text: "Wow! delicious",
        price: "75",
        qty: "12",
      },
    ],
  },
  {
    name: "Mr Arif",
    orderId: "#124546",
    mobile: "019201445655",
    paymentStatus: "Cash On Delivery",
    total: 3640,
    comments: "",
    products: [
      {
        image: product,
        text: "jhal fried ",
        price: "105",
        qty: "18",
      },
      {
        image: product,
        text: "Wow! checken curry",
        price: "100",
        qty: "4",
      },
      {
        image: product,
        text: "Wow! delicious",
        price: "75",
        qty: "18",
      },
    ],
  },
  {
    name: "Mh Murshed",
    orderId: "#442378",
    mobile: "01920145161",
    paymentStatus: "Cash On Delivery",
    total: 720,
    comments: "",
    products: [
      {
        image: product,
        text: "Wow! That looks delicious",
        price: "305",
        qty: "20",
      },
      {
        image: product,
        text: "Wow! ",
        price: "80",
        qty: "14",
      },
      {
        image: product,
        text: "Wow! delicious",
        price: "15",
        qty: "2",
      },
    ],
  },
  {
    name: "Mh Murshed",
    orderId: "#445423",
    mobile: "01920145161",
    paymentStatus: "Cash On Delivery",
    total: 720,
    comments: "",
    products: [
      {
        image: product,
        text: "Wow! That looks delicious",
        price: "305",
        qty: "20",
      },
      {
        image: product,
        text: "Wow! ",
        price: "80",
        qty: "14",
      },
      {
        image: product,
        text: "Wow! delicious",
        price: "15",
        qty: "2",
      },
    ],
  },
  {
    name: "Mh Murshed",
    orderId: "#442478",
    mobile: "01920145161",
    paymentStatus: "Cash On Delivery",
    total: 720,
    comments: "",
    products: [
      {
        image: product,
        text: "Wow! That looks delicious",
        price: "305",
        qty: "20",
      },
      {
        image: product,
        text: "Wow! ",
        price: "80",
        qty: "14",
      },
      {
        image: product,
        text: "Wow! delicious",
        price: "15",
        qty: "2",
      },
    ],
  },
];
export let cookingDummyArr = [
  {
    name: "Mh Murshed",
    orderId: "#442347",
    mobile: "01920145161",
    paymentStatus: "Cash On Delivery",
    total: 720,
    comments: "",
    products: [
      {
        image: product,
        text: "Wow! That looks delicious",
        price: "305",
        qty: "20",
      },
      {
        image: product,
        text: "Wow! ",
        price: "80",
        qty: "14",
      },
      {
        image: product,
        text: "Wow! delicious",
        price: "15",
        qty: "2",
      },
    ],
  },
];
export let readyDummyArr = [
  {
    name: "Mh Murshed",
    orderId: "#442347",
    mobile: "01920145161",
    paymentStatus: "Cash On Delivery",
    total: 720,
    comments: "",
    products: [
      {
        image: product,
        text: "Wow! That looks delicious",
        price: "305",
        qty: "20",
      },
      {
        image: product,
        text: "Wow! ",
        price: "80",
        qty: "14",
      },
      {
        image: product,
        text: "Wow! delicious",
        price: "15",
        qty: "2",
      },
    ],
  },
];

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

const CardComponent = ({ el, setForceRender, color }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onClickButtonHandler = (id, pendingArr, cookingArr) => {
    const newArr = pendingArr.filter((el) => {
      if (el.orderId == id) {
        cookingArr.push(el);
      }
      return el.orderId != id;
    });
    pendingDummyArr = newArr;
    setForceRender((prv) => !prv);
  };
  console.log("pend", pendingDummyArr);
  return (
    <Card
      sx={{
        borderTop: `1px solid ${color}`,
        margin: "5px 5px 15px 5px",
        padding: "10px",
      }}
    >
      <CardHeaderStyles>
        <Header name={el.name} orderId={el.orderId} mobile={el.mobile} />
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
        {el.products.map((pd) => (
          <OrderQuantity product={pd} />
        ))}
        {el.comments && (
          <Box
            sx={{
              width: "95%",
              height: "10vh",
              border: "1px solid #353535",
              padding: "10px",
              margin: "20px auto",
              borderRadius: "5px",
            }}
          >
            <Typography color="#cbcbcb">NOTE : {el.comments}</Typography>
          </Box>
        )}
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
            <Typography color="white">Total</Typography>
            <Typography color="white">৳ {el.total}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="white">Payment Method</Typography>
            <Typography color="white">{el.paymentStatus}</Typography>
          </Box>
        </Box>
        <Button
          onClick={() =>
            onClickButtonHandler(
              el.orderId,
              pendingDummyArr,
              cookingDummyArr,
              readyDummyArr
            )
          }
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