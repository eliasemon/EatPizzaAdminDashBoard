import { Box, Button, Typography } from "@mui/material";
import  { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ItemList from "../../../constants/ItemsList";
import product from "../../../assets/images/profile.jpg";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "@mui/material";
import UserDetails from "./UserDetails";
import { showDataWithPagination , findDataWithQuries } from "../../../../utils";
import { toast } from "react-toastify";
import UsersListCard from "./UsersListCard";
// import { httpsCallable } from "firebase/functions";
// import { functions } from "../../../../firebaseConfig";
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



const inputValidate = (state) => {
    if(state.length > 14){
      return false
    }
    if(state == ""){
      return ""
    }
    if (state.startsWith('8')) {
      return `+${state}`
    }
    if (state.startsWith('+')) {
      return state
    }

    if (state.startsWith('0') ) {
      return `+88${state}`
    }
    return false
}


const Users = () => {

  const [usersList , setUserList] = useState("");
  const [searchPhone , setSearchPhone] = useState("")
  const limitation = 8;
  const searchHandle = (e) =>{
    const data = inputValidate(e.target.value)
    if(data === ""){
      setSearchPhone(data)
      return
    }
    if(data){
      setSearchPhone(data)
    }else{
      toast.error("Please Type Properly");
    }
  }


  useEffect(()=>{
    if(searchPhone.length == 14){
      findDataWithQuries("usersList" ,"phoneNumber" ,`${searchPhone}`).then((data)=>{
        setUserList(data)
      }).catch((error) =>{
        toast.error("No Data Found");
      })
    }
  },[searchPhone])


  useEffect(()=>{
    showDataWithPagination(setUserList,  "usersList" , 0 , limitation, false , "fullName")
  },[])

  const onPaginationHandle = (type) =>{
    if(type){
      showDataWithPagination(setUserList,  "usersList" , 0 , limitation, false , "fullName")
      return
    }
    showDataWithPagination(setUserList,  "usersList" , usersList[limitation-1] , limitation, false , "fullName")
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
          height: "95%",
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
              onChange={searchHandle}
              value={searchPhone}
              placeholder="Enter user's phone number"
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "#fff",
              }}
            />
          </Search>
        </Box>
        <Box
          sx={{
            // marginTop: "3%",
            height: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "3rem",
              display: "grid",
              gridTemplateColumns: "2fr 2fr 1fr",
            }}
          >
            <ListHeader>Username</ListHeader>
            <ListHeader>Phone Number</ListHeader>
            <ListHeader>Block Status</ListHeader>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              overflowY: "auto",
            }}
          >
            {usersList &&
              usersList.map((doc, index) => {
                const item = doc.data();
                item.id = doc.id;
                return <UsersListCard key={item.id} item={item} />;
              })}
          </Box>
          <Box sx={{ paddingTop: "1rem" }}>
            <Button
              variant="outlined"
              onClick={() => onPaginationHandle(false)}
              disabled={usersList[limitation - 1] ? false : true}
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
      {/* <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <UserDetails />
        </Modal> */}
    </Box>
  );
};

export default Users;



