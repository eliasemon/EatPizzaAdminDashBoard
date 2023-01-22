import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import OrderQuantity from "../routesComponent/currentOrders/OrderQuantity";





const Header = ({ name, orderId, mobile }) => {
  return (
    <Box sx={{ padding: "8px 4px", color: "lightgray" }}>
      <Typography fontSize="22px">{mobile}</Typography>
      <Typography color="#c8c8c8">{name}</Typography>
      <Typography color="#c8c8c8">{orderId}</Typography>
    </Box>
  );
};


const PrintOrderDetails = ({el}) => {


  return (
    <Card
      sx={{
        margin: "5px 5px 15px 5px",
        padding: "10px",
      }}
    >
      <Box>
        <Header name={el.userName} orderId={el.id} mobile={el?.userPhoneNumber} />
      </Box>
      <Box>
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
            <Typography color="black">Subtotal</Typography>
            <Typography color="black">৳ {el.subTottal}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="black">Delivery And Other Cost</Typography>
            <Typography color="black">৳ {el.totalExtraCost}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="black">- Discount</Typography>
            <Typography color="black"> -{el.discountAmmount}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="black">Total</Typography>
            <Typography color="black">৳ {el.TotalOrderAmmount}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="black">Payment Method</Typography>
            <Typography color="black">{el.paymentType}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="black">Shiping Address</Typography>
            <Typography color="black">{el.shipingAddress}</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
export default PrintOrderDetails;
