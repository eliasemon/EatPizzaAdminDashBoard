import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  showDataWithPagination,
  getSingleDataWithOutRealTimeUpdates,
} from "../../../../utils";
import { toast } from "react-toastify";
import OrdersItemsCard from "./OrdersItemsCard";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60ch",
    },
  },
}));

const ListHeader = styled(Box)`
  width: 100%;
  height: 40px;
  color: #fff;
  font-weight: 700;
  background-color: #212020;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrdersHistory = () => {
  const [ordersList, setOrdersList] = useState("");

  const [searchOrderId, setSearchOrderId] = useState("");
  const limitation = 8;

  const onSearchButtonClick = () => {
    getSingleDataWithOutRealTimeUpdates("ordersList", searchOrderId, true)
      .then((data) => {
        setOrdersList([data]);
      })
      .catch((error) => {
        toast.error("No Data Found");
      });
  };

  console.log(ordersList);

  useEffect(() => {
    showDataWithPagination(
      setOrdersList,
      "ordersList",
      0,
      limitation,
      false,
      "creationTime"
    );
  }, []);

  const onPaginationHandle = (type) => {
    if (type) {
      showDataWithPagination(
        setOrdersList,
        "ordersList",
        0,
        limitation,
        false,
        "creationTime"
      );
      return;
    }
    showDataWithPagination(
      setOrdersList,
      "ordersList",
      ordersList[limitation - 1],
      limitation,
      false,
      "creationTime"
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "1.5%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#252525",
          height: "85%",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "start",
            padding: "2% 1% 0",
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="#" />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => setSearchOrderId(e.target.value)}
              value={searchOrderId}
              placeholder="Enter order ID"
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "#fff",
              }}
            />
            <Button
              variant="contained"
              sx={{ margin: ".25rem" }}
              onClick={onSearchButtonClick}
            >
              Search
            </Button>
          </Search>
        </Box>
        <Box
          sx={{
            marginTop: "3%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
            }}
          >
            <ListHeader>Order ID</ListHeader>
            <ListHeader>Username</ListHeader>
            <ListHeader>Phone Number</ListHeader>
            <ListHeader>Time</ListHeader>
            <ListHeader>Status</ListHeader>
            <ListHeader>Print</ListHeader>
          </Box>
          <Box
            sx={{
              // height: "35%",
              width: "100%",
              height: "100%",
              overflowY: "auto",
            }}
          >
            {ordersList &&
              ordersList.map((doc, index) => {
                const item = doc.data();
                item.id = doc.id;
                const creationDate = new Date(Number(item.creationTime));
                return (
                  <>
                    <OrdersItemsCard
                      key={item.id}
                      item={item}
                      creationDate={creationDate}
                    />
                  </>
                );
              })}
            <Box sx={{ paddingTop: "1rem" }}>
              <Button
                sx={{ marginLeft: "1rem" }}
                variant="outlined"
                onClick={() => onPaginationHandle(false)}
                disabled={ordersList[limitation - 1] ? false : true}
              >
                Next
              </Button>
              <Button
                sx={{ marginLeft: "1rem" }}
                variant="outlined"
                onClick={() => onPaginationHandle(true)}
              >
                First page
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrdersHistory;
