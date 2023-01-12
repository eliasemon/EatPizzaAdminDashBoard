
import { Box,Typography} from "@mui/material";



const OrderQuantity = ({product}) => {
    const {image,itemCount ,name , selectedVariant , selectedAddonsForCard , specialInstructions}=product

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
            src={image.imageDownloadUrl}
            width={50}
            height={50}
            style={{ borderRadius: "5px", marginBottom: "5px" }}
          />
          <Typography color="white">{name}</Typography>
          <Typography color="white">X {itemCount}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="white">Variant:- {selectedVariant.name}</Typography>
          <Typography color="#77DEFF">৳ {selectedVariant.regularPrice}</Typography>
        </Box>
        {Object.keys(selectedAddonsForCard).map((key)=>{
          const item = selectedAddonsForCard[key]
          return(
            <Box key={key} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="white">{item.name}</Typography>
              <Typography color="white">price :- {item.price}</Typography>
            </Box>
          )
        })}
        
        {specialInstructions && (
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
            <Typography color="#cbcbcb">NOTE : {specialInstructions}</Typography>
          </Box>
        )}
      </Box>
    );
}
export default OrderQuantity