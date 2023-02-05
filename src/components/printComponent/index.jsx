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
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
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
              Unit Price
            </Typography>
          </Box>
          {/*Column*/}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
              Total
            </Typography>
          </Box>
        </Box>
        {Object.keys(el.items).map((key) => {
          let itemName = el.items[key].name;
          let variantName = el.items[key].selectedVariant.name;
          let itemCount = parseInt(el.items[key].itemCount);
          let itemPrice = parseInt(el.items[key].selectedVariant.regularPrice);
          let totalItemPrice = itemCount * itemPrice;

          return (
            <Box
              key={`Print${key}`}
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
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  width: "100%",
                  border: "1px solid #353535",
                  padding: ".25rem 2rem",
                }}
              >
                {/*Column*/}
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ marginLeft: ".5rem", textAlign: "left" }}>
                    {itemName} {variantName}
                  </Typography>
                </Box>
                {/*Column*/}
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ marginLeft: ".5rem", textAlign: "center" }}>
                    x{itemCount}
                  </Typography>
                </Box>
                {/*Column*/}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ marginRight: ".5rem", textAlign: "center" }}
                  >
                    ৳ {itemPrice}
                  </Typography>
                </Box>
                {/*Column*/}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ marginRight: ".5rem", textAlign: "center" }}
                  >
                    ৳ {totalItemPrice}
                  </Typography>
                </Box>
              </Box>

              {Object.keys(el.items[key].selectedAddonsForCard).map(
                (childrenkey) => {
                  const addonName =
                    el.items[key].selectedAddonsForCard[childrenkey].name;
                  const addonCount = parseInt(
                    el.items[key].selectedAddonsForCard.itemCount
                  );
                  const addonPrice = parseInt(
                    el.items[key].selectedAddonsForCard[childrenkey].price
                  );
                  return (
                    <Box
                      key={key + 100}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1fr",
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
                          {addonName}
                        </Typography>
                      </Box>
                      {/*Column*/}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{ marginLeft: ".5rem", textAlign: "center" }}
                        >
                          x{itemCount}
                        </Typography>
                      </Box>
                      {/*Column*/}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{ marginRight: ".5rem", textAlign: "center" }}
                        >
                          ৳ {addonPrice}
                        </Typography>
                      </Box>
                      {/*Column*/}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{ marginRight: ".5rem", textAlign: "center" }}
                        >
                          ৳ {itemCount * addonPrice}
                        </Typography>
                      </Box>
                    </Box>
                  );
                }
              )}
            </Box>
          );
        })}
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
