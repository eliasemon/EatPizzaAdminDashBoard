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
import { showDataWithPagination , getSingleDataWithOutRealTimeUpdates } from "../../../../utils";
import { getFirestore , doc , updateDoc} from "firebase/firestore";
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

const inputValidate = (state) => {
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
  const navigate = useNavigate();
  const [usersList , setUserList] = useState("");
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    if(searchPhone.length === 14){
      getSingleDataWithOutRealTimeUpdates("usersList" , searchPhone , true).then((data) => {
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


  const restrictionHandle = async (id , initialState) =>{
    const db = getFirestore()
    const colRef = doc(db, "usersList" , `${id}` );
    await updateDoc( colRef ,{isRestricted :  !initialState})
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
              gridTemplateColumns: "1fr 2fr 2fr 1fr 1fr",
            }}
          >
            <ListHeader>User ID</ListHeader>
            <ListHeader>Username</ListHeader>
            <ListHeader>Phone Number</ListHeader>
            <ListHeader>Restriction</ListHeader>
            <ListHeader>Delete User</ListHeader>
          </Box>
          <Box sx={{
            width : "100%",
            height : "100%",
            boxSizing : "border-box"
          }}>


          {usersList && usersList.map((doc, index) =>
          { 
            const item =  doc.data()
          return (
          <Box
            key = {item.id}
            sx={{
              // height: "35%",
              // width: "35%",
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 2fr 2fr 1fr 1fr",
            }}
          >
                <ListBody>{item.uid}</ListBody>
                <ListBody
                  onClick={handleOpen}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <img
                    src={product}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "1rem",
                    }}
                  />
                  {item.fullName}
                </ListBody>
                <ListBody>{item.phoneNumber}</ListBody>
                <ListBody>
                  <PersonOffIcon
                  onClick={() => restrictionHandle(item.id , item.isRestricted)}
                    fontSize="large"
                    sx={{
                      color : `${item.isRestricted ? "red" : "white"}`,
                      "&:hover": {
                        color: "secondary.light",
                        cursor: "pointer",
                      },
                    }}
                  />
                </ListBody>
                <ListBody>
                  <DeleteIcon
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
          <Button onClick={() => onPaginationHandle(false)} disabled={usersList[limitation - 1] ? false : true}>Next</Button>
          <Button onClick={() => onPaginationHandle (true)} >First page</Button>
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



