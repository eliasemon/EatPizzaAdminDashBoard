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
    <Box sx={{ padding: "2rem" }}>
      <h1
        style={{
          textAlign: "center",
          textDecoration: "underline",
          marginBottom: "1rem",
        }}
      >
        Invoice
      </h1>
      <Box sx={{ display: "flex", gap: 2 }}>
        <h3>Order ID : </h3>
        <h3>{el.id}</h3>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <h3>Customer name : </h3>
        <h3>{el.userName}</h3>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <h3>Phone Number: </h3>
        <h3>{el.userPhoneNumber}</h3>
      </Box>

      {/*Table*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: "2rem",
        }}
      >
        {/*Row*/}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            border: "1px solid black",
            padding: ".25rem",
          }}
        >
          {/*Column*/}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
              Products
            </Typography>
          </Box>
          {/*Column*/}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
              Quantity
            </Typography>
          </Box>
          {/*Column*/}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
              Total
            </Typography>
          </Box>
        </Box>
        {Object.keys(el.items).map((key) => (
          <Box
            key={key}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              border: "1px solid #353535",
              padding: ".25rem",
            }}
          >
            <Box
              key={key + 100}
              sx={{
                display: "flex",
                width: "100%",
                border: "1px solid #353535",
                padding: ".25rem 2rem",
              }}
            >
              {/*Column*/}
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ marginLeft: ".5rem", textAlign: "left" }}>
                  {el.items[key].name} {el.items[key].selectedVariant.name}
                </Typography>
              </Box>
              {/*Column*/}
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ marginLeft: ".5rem", textAlign: "center" }}>
                  x{el.items[key].itemCount}
                </Typography>
              </Box>
              {/*Column*/}
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ marginRight: ".5rem", textAlign: "right" }}>
                  ৳ {el.items[key].selectedVariant.regularPrice}
                </Typography>
              </Box>
            </Box>

            {Object.keys(el.items[key].selectedAddonsForCard).map(
              (childrenkey) => {
                const item = el.items[key].selectedAddonsForCard[childrenkey];
                return (
                  <Box
                    key={key + 100}
                    sx={{
                      display: "flex",
                      width: "100%",
                      border: "1px solid #353535",
                      padding: ".25rem 2rem",
                    }}
                  >
                    {/*Column*/}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{ marginLeft: ".5rem", textAlign: "left" }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    {/*Column*/}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{ marginLeft: ".5rem", textAlign: "center" }}
                      >
                        x1
                      </Typography>
                    </Box>
                    {/*Column*/}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{ marginRight: ".5rem", textAlign: "right" }}
                      >
                        ৳ {item.price}
                      </Typography>
                    </Box>
                  </Box>
                  // </Box>
                );
              }
            )}
          </Box>
        ))}
      </Box>

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
          <Typography color="black">Discount</Typography>
          <Typography color="black">
            {" "}
            {el.discountAmmount ? `-${el.discountAmmount}` : 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="black">Total</Typography>
          <Typography color="black">৳ {el.TotalOrderAmmount}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="black">Payment Method</Typography>
          <Typography color="black">
            {el.paymentType == "cashon" ? "Cash on Delivery" : el.paymentType}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="black">Shiping Address</Typography>
          <Typography color="black">{el.shipingAddress}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default PrintOrderDetails;
