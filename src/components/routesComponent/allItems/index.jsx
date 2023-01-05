import { Box, Button } from "@material-ui/core";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import ItemList from "../../../constants/ItemsList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import product from "../../../assets/images/product.jpg";

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

const AllItems = () => {
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
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Enter user ID or username or phonenumber"
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "#fff" }}
            />
          </Search>
          <Button
            onClick={() => navigate("/createitem")}
            variant="contained"
            size="large"
            color="primary"
          >
            Create Items
          </Button>
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
              gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr",
            }}
          >
            <ListHeader>Item ID</ListHeader>
            <ListHeader>Items Name</ListHeader>
            <ListHeader>Regular Price</ListHeader>
            <ListHeader>Sale Price</ListHeader>
            <ListHeader>Edit Items</ListHeader>
            <ListHeader>Delete Items</ListHeader>
          </Box>
          <Box
            sx={{
              height: "35%",
              // width: "35%",
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr",
              overflowY: "scroll",
            }}
          >
            {ItemList.map((item) => (
              <>
                <ListBody>{item.id}</ListBody>
                <ListBody>
                  <img
                    src={product}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "1rem",
                    }}
                  />
                  {item.name}
                </ListBody>
                <ListBody>50</ListBody>
                <ListBody>45</ListBody>
                <ListBody>
                  <EditIcon
                    onClick={() => console.log("EditIcon clicked")}
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
                    onClick={() => console.log("EditIcon clicked")}
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

export default AllItems;
