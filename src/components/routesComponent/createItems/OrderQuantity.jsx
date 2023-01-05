
import { Box,Typography} from "@mui/material";



const OrderQuantity = ({product}) => {
    const {image,price,qty,text}=product

    return (
      <Box
        sx={{
          disply: "flex",
          flexDirection: "row",
          padding: "15px 20px",
          background: "rgba(255,255,255, 0.02)",
          margin: "10px",
          borderRadius: "5px",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src={image}
            width={50}
            height={50}
            style={{ borderRadius: "5px", marginBottom: "5px" }}
          />
          <Typography color="#77DEFF">৳ {price}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="white">{text}</Typography>
          <Typography color="white">X {qty}</Typography>
        </Box>
      </Box>
    );
}
export default OrderQuantity