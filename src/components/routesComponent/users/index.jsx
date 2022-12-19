import { Box } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserDetails  from "./UserDetails";


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

const data = [
  { id: 1, userName: 'tapu', img: '', phoneNumber: '0178545656', restriction: true },
  { id: 2, userName: 'tapuS', img: '', phoneNumber: '0178545658', restriction: false },
  { id: 3, userName: 'tapuM', img: '', phoneNumber: '0178545659', restriction: false },
  { id: 4, userName: 'tapuC', img: '', phoneNumber: '0178545655', restriction: false },
  { id: 5, userName: 'tapuC', img: '', phoneNumber: '0178545655', restriction: true }

]


const dataMaping = (user) => {


  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      gridTemplateRows: '1fr',
      padding: '10px 0px 10px 0px',
      borderBottom: '1px solid white',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'

    }}>
      <Box >{user.id}</Box>
      <Box sx={{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
      }}>
      
          <AccountCircleIcon fontSize="large" />
        <Box sx = {{textAlign:'left',padding:'10px'}}>
            <Box>{user.userName}mojumder</Box>
            <Box>location</Box>
        </Box>
      </Box>
      <Box>{user.phoneNumber}</Box>
      <Box>{user.restriction ? <PersonIcon /> : <PersonOffIcon />}</Box>
      <Box>{<DeleteIcon />}</Box>
    </Box>
  )
}


const Users = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // gridTemplateColumns: "17.9vw auto",
        width: "100%",
        height: "100%",

      }}>
        
      {
        // Search bar 
      }

      <Box sx={{ display: "flex" }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Enter user ID or username or phonenumber"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Box>

      {
        // Table Header
      }

      <Box sx={{
        marginTop: '3%',
        display: 'grid',
        gridTemplateColumns: 'repeat(5,1fr)',
        gridTemplateRows: '1fr',
        paddingBottom: '10px',
        borderBottom: '2px solid white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'

      }} >

        <Box>User's ID</Box>
        <Box>User name</Box>
        <Box>PhoneNumber</Box>
        <Box>Restriction</Box>
        <Box>Delete User</Box>

      </Box>


      {
        // Data maping
      }



      {
        data.map(user => dataMaping(user))
      }

      <UserDetails />


    </Box>
  )
};

export default Users;
