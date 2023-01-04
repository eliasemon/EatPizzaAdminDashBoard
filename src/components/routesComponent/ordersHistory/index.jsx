import { Box, Button } from "@material-ui/core";
import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ItemList from "../../../constants/ItemsList";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

import { Chip } from "@mui/material";

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
  const navigate = useNavigate();

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
              placeholder="Enter user ID or username or phonenumber"
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "#fff",
              }}
            />
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
            <ListHeader>Download</ListHeader>
          </Box>
          <Box
            sx={{
              height: "35%",
              // width: "35%",
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
              overflowY: "scroll",
            }}
          >
            {ItemList.map((item, index) => (
              <>
                <ListBody>#751</ListBody>
                <ListBody>{item.name}</ListBody>
                <ListBody>+8801771551910</ListBody>
                <ListBody>2:30 12 July 2022</ListBody>
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
              </>
            ))}
            {/* {Object.keys(variants).map((id) => {
              const item = variants[`${id}`];
              console.log("item", item);
              return (
                <>
                <ListBody>{item.name}</ListBody>
                <ListBody>{item.regularPrice}</ListBody>
                <ListBody>{item.sellingPrice}</ListBody>
                <ListBody>
                <EditIcon
                onClick={() =>
                  setVariantUI(
                    <AddVariants
                  incomingItem={item}
                  onStateLift={onVariantStateLift}
                  />
                  )
                }
                sx={{
                  "&:hover": {
                    color: "secondary.light",
                    cursor: "pointer",
                  },
                }}
                />
                </ListBody>
                <ListBody>
                <DeleteIcon
                onClick={() => deleteVariantsHandle(item.id)}
                sx={{
                  "&:hover": {
                    color: "secondary.light",
                    cursor: "pointer",
                  },
                }}
                />
                </ListBody>
                </>
                // {defualtVariant.id == id && (
                  //   <ListItemText
                  //     primary={"Defualt"}
                  //     sx={{ color: "green" }}
                  //   />
                  // )}
                  );
                })} */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrdersHistory;
