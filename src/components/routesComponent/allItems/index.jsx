import { Button, Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import usePagination from "../../../hooks/usePagination";
import {
  showDataWithPaginationForItems,
  delteColloctionInstance,
} from "../../../../utils";

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
  height: 100%;
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
  /* justify-content: center; */
  align-items: center;
  border-bottom: 1px solid #212020;
`;

const AllItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState("");
  const [itemDocsRefAll , setItemsDocsRefAll ] = useState("");
  const { ui, activepage, changeTheLocalTotal } = usePagination(1);
  const limitation = 7;


  useEffect(() => {
    showDataWithPaginationForItems(setItemsDocsRefAll, "productlist")
  }, []);

  useEffect(()=>{
    changeTheLocalTotal(Math.ceil(Number(itemDocsRefAll.length) / limitation));
  },[itemDocsRefAll])

  useEffect(() => {
    const data = []
    const startIndex =  limitation * (activepage - 1)
    for(let i = startIndex ; i < startIndex+7 ; i++ ){
      console.log( itemDocsRefAll[i]?.data())
      const item = itemDocsRefAll[i]?.data()
      if(!item){
        continue;
      }
      item.id = itemDocsRefAll[i].id
      data.push(item)
    }
    setItems([...data])
  }, [activepage, itemDocsRefAll]);


  const deleteItem = (id, collectionRef, imageRef, itemName) => {
    if (
      window.confirm(
        `******************************************** \n\n Wait:= \n\n Do You Wanna Delete \n**"${itemName}"**\nCatagory Item!!! \n\n ********************************************`
      )
    ) {
      delteColloctionInstance(id, collectionRef, imageRef);
    }
    return;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "1%",

        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#252525",
          maxHeight: "100%",
          width: "100%",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "10%",
            justifyContent: "space-between",
            alignItems: "start",
            padding: "2%",
          }}
        >
          <Button
            onClick={() => navigate("/items/createitem")}
            variant="contained"
            size="large"
            color="primary"
          >
            Create Items
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: "2%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "3rem",
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
              height: "90%",
              width: "100%",
              boxSizing: "border-box",
              flex: 1,
            }}
          >
            {items &&
              items.map((item) => {
               
                return (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr",
                    }}
                    key={item.id}
                  >
                    <ListBody sx={{ padding: "1rem" }}>{item.id}</ListBody>
                    <ListBody sx={{ paddingLeft: "2rem" }}>
                      <img
                        src={item.image.imageDownloadUrl}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "1rem",
                        }}
                      />
                      {item.name}
                    </ListBody>
                    <ListBody sx={{ textAlign: "center", paddingLeft: "3rem" }}>
                      {item.defualtVariant.regularPrice}
                    </ListBody>
                    <ListBody sx={{ paddingLeft: "3rem" }}>
                      {item.defualtVariant.sellingPrice}
                    </ListBody>
                    <ListBody sx={{ paddingLeft: "3rem" }}>
                      <EditIcon
                        onClick={() => navigate(`/items/createitem/${item.id}`)}
                        sx={{
                          "&:hover": {
                            color: "secondary.light",
                            cursor: "pointer",
                          },
                        }}
                      />
                    </ListBody>
                    <ListBody sx={{ paddingLeft: "3rem" }}>
                      <DeleteIcon
                        onClick={() =>
                          deleteItem(
                            item.id,
                            "productlist",
                            item.image.imgRef,
                            item.name
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
                  </Box>
                );
              })}
          </Box>
        </Box>
        {ui}
      </Box>
    </Box>
  );
};

export default AllItems;
