import { Box, Button } from "@material-ui/core";
import { useState , useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ItemList from "../../../constants/ItemsList";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Chip } from "@mui/material";
import { showDataWithPagination } from "../../../../utils";
import { toast } from "react-toastify";

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
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
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

const ListBody = styled(Box)`
  width: 100%;
  /* min-height: 40px; */
  color: #fff;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background-color: #2f2e2e;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #212020;
`;

const OrdersHistory = () => {

  const [ordersList , setOrdersList] = useState("");
  // const [open, setOpen] = useState(true);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [searchOrderId , setSearchOrderId] = useState("")
  const limitation = 8;


  const onSearchButtonClick = () =>{
          getSingleDataWithOutRealTimeUpdates("ordersList" , searchOrderId , true).then((data) => {
            setOrdersList(data)
          }).catch((error) =>{
            toast.error("No Data Found");
          })
  }


console.log(ordersList)
  useEffect(()=>{
    showDataWithPagination(setOrdersList,  "ordersList" , 0 , limitation, false , "creationTime" )
  },[])

  const onPaginationHandle = (type) =>{
    if(type){
      showDataWithPagination(setOrdersList,  "ordersList" , 0 , limitation, false , "creationTime" )
      return
    }
    showDataWithPagination(setOrdersList,  "ordersList" , ordersList[limitation-1] , limitation, false , "creationTime" )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // gridTemplateColumns: "17.9vw auto",
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
              onChange={(e)=> setSearchOrderId(e.target.value)}
              value={searchOrderId}
              placeholder="Enter order ID"
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "#fff",
              }}
            />
          </Search>
          <Button onClick={onSearchButtonClick}>Search</Button>
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
            <ListHeader>Download</ListHeader>
          </Box>
          <Box sx={{
              height: "35%",
              width: "100%",
              overflowY: "scroll",
          }}>
          {ordersList && ordersList.map((doc , index) =>{
              const item = doc.data()
              const creationDate = new Date(Number(item.creationTime))
              return(
          <Box
            key={item.id}
            sx={{
              
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
              
            }}
          >
                <ListBody>#751</ListBody>
                <ListBody>{item.userName}</ListBody>
                <ListBody>{item?.userPhoneNumber}</ListBody>
                <ListBody>{creationDate.toLocaleString()}</ListBody>
                <ListBody>
                  <Chip
                    label={index % 2 == 0 ? "Delivered" : "Cancelled"}
                    color={index % 2 == 0 ? "success" : "error"}
                  />
                </ListBody>
                <ListBody>
                  <DownloadForOfflineIcon
                    fontSize="large"
                    sx={{
                      "&:hover": {
                        color: "secondary.light",
                        cursor: "pointer",
                      },
                    }}
                  />
                </ListBody>
              </Box>
            )})}
            <Button onClick={() => onPaginationHandle(false)} disabled={ordersList[limitation - 1] ? false : true}>Next</Button>
          <Button onClick={() => onPaginationHandle (true)} >First page</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrdersHistory;
