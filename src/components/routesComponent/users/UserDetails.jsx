import {useState} from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material/";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import profileImg from "../../../assets/images/profile.jpg";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import OrdersItemsCard from "./OrdersItemsCard";
import { findDataWithQuries } from "../../../../utils";
import { styled, alpha } from "@mui/material/styles";
import { toast } from "react-toastify";

import PersonOffIcon from "@mui/icons-material/PersonOff";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import { Dialog } from "@mui/material";
import ConfirmationBox from "../../UI/ConfirmationBox";

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

const UserDetails = ({ user }) => {
  // const user = {
  //   Name: "Tapu Mojumder",
  //   UserId: 111,
  //   Avater: "kk",
  //   PhoneNumber: "0122555656",
  //   BanStatus: "false",
  //   UsercreationDate: Date(),
  //   OrderHistoryRef: "ref link",
  //   completedOrder: 12,
  //   cancelOrder: 4,
  //   TotalSpent: 1200,
  // };

  const [ordersList, setOrdersList] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  let [message, setMessage] = useState("");
  const [agreeFunction, setAgreeFunction] = useState(null);

  const handelOrdersList = () => {
    findDataWithQuries("ordersList", "userID", item.uid)
      .then((data) => {
        setOrdersList(data);
      })
      .catch(() => {
        toast.error("No Orders Found For This User");
      });
  };

  const restrictionHandle = async (id, initialState) => {
    if (
      window.confirm(
        `Do You Wanna ${initialState ? "Unrestrict" : "Restrict"} The User`
      )
    ) {
      const db = getFirestore();
      const colRef = doc(db, "usersList", `${id}`);
      await updateDoc(colRef, { isRestricted: !initialState });
    }
  };

  const handleClickOpen = (messageString, onAgree) => {
    setMessage(messageString);
    setAgreeFunction(onAgree);
    setDialogOpen(true);
  };

  return (
    <Box>
      {!dialogOpen && (
        <Card sx={{ backgroundColor: "#353535" }}>
          <CardContent sx={{ margin: ".5rem" }}>
            <Grid container spacing={10}>
              <Grid item md={4}>
                <Box style={{ color: "#fff" }}>
                  <img
                    src={user.photoURL}
                    width={"150px"}
                    height={"150px"}
                    style={{ borderRadius: "10%" }}
                  />
                </Box>
              </Grid>
              <Grid item md={8}>
                <Typography variant="h5" sx={{ color: "#fff" }}>
                  {user.fullName}
                </Typography>
                <Box sx={{ display: "flex", marginTop: ".25rem" }}>
                  <Typography sx={{ color: "#fff" }}>
                    Phone Number :{" "}
                  </Typography>
                  <Typography pl={1} sx={{ color: "#fff" }}>
                    {user.phoneNumber}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", marginTop: ".25rem" }}>
                  <Typography sx={{ color: "#fff" }}>Status : </Typography>
                  <Typography pl={1} sx={{ color: "#fff" }}>
                    {user.isRestricted ? "Banned" : "Not Restricted"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", marginTop: ".25rem" }}>
                  <Typography sx={{ color: "#fff" }}>Address : </Typography>
                  <Typography pl={1} sx={{ color: "#fff" }}>
                    {user.shipingAddress}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", marginTop: ".25rem" }}>
                  <Typography sx={{ color: "#fff" }}>Created at : </Typography>
                  <Typography pl={1} sx={{ color: "#fff" }}>
                    {user.profileCreation}
                  </Typography>
                </Box>
                {console.log(user)}
              </Grid>
            </Grid>
            <Box sx={{ marginTop: ".5rem" }}>
              <Button
                variant="contained"
                endIcon={<HistoryIcon />}
                sx={{ marginRight: ".5rem" }}
              >
                Order History
              </Button>
              <Button
                variant="contained"
                endIcon={<PersonOffIcon />}
                sx={{ marginRight: ".5rem" }}
                onClick={() => {
                  handleClickOpen(
                    `Are you sure you want ban ${user.fullName} ? ${user.fullName} will not able to order anything`,
                    () => {
                      console.log("Agree button clicked from BAN USER");
                    }
                  );
                }}
              >
                Ban User
              </Button>
              <Button
                variant="contained"
                endIcon={<DeleteIcon />}
                sx={{ marginRight: ".5rem" }}
                onClick={() => {
                  handleClickOpen(
                    `Are you sure you want delete ${user.fullName}'s account ? ${user.fullName} will not able login anymore with this account`,
                    () => {
                      console.log("Agree button clicked from DELETE USER");
                    }
                  );
                }}
              >
                Delete User
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
      {dialogOpen && (
        <ConfirmationBox
          data={{ dialogOpen, setDialogOpen, message, agreeFunction }}
        />
      )}
      {/* <Box
        sx={{
          display: "flex",
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          background: "#cbcbcb",
          borderRadius: "5px",
          position: "absolute",
          top: "25%",
          left: "25%",
          right: "25%",
          bottom: "25%",
        }}
      >
        <PersonOffIcon
          onClick={() => restrictionHandle(item.id, item.isRestricted)}
          fontSize="large"
          sx={{
            color: `${item.isRestricted ? "red" : "white"}`,
            "&:hover": {
              color: "secondary.light",
              cursor: "pointer",
            },
          }}
        />

        <Box sx={{ textAlign: "center", padding: "3%" }}>
          <img
            src={profileImg}
            width={"140px"}
            height={"140px"}
            style={{ borderRadius: "50%" }}
          />
          <Typography variant="h6" p={1}>
            {user.Name}
          </Typography>
          <Button onClick={handelOrdersList} variant="contained">
            OrdersHistory
          </Button>
        </Box>
        <Box sx={{ padding: "3%" }}>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: "bold", color: "gray" }}>
              UserId:
            </Typography>
            <Typography pl={1}>{user.UserId}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: "bold", color: "gray" }}>
              phone number:{" "}
            </Typography>
            <Typography pl={1}> {user.PhoneNumber}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: "bold", color: "gray" }}>
              BanStatus :{" "}
            </Typography>
            <Typography pl={1}> {user.BanStatus}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: "bold", color: "gray" }}>
              creation Date:
            </Typography>
            <Typography pl={1}>{user.UsercreationDate}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: "bold", color: "gray" }}>
              Total Completed Order:
            </Typography>
            <Typography pl={1}>{user.completedOrder}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: "bold", color: "gray" }}>
              Total Cancel Order:
            </Typography>
            <Typography pl={1}>{user.cancelOrder}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: "bold", color: "gray" }}>
              Total spend:
            </Typography>
            <Typography pl={1}>{user.TotalSpent}</Typography>
          </Box>
        </Box>
      </Box> */}
      {
        // ordersList && (
        //   <Box
        //     sx={{
        //       marginTop: "3%",
        //       height: "100%",
        //       display: "flex",
        //       flexDirection: "column",
        //     }}
        //   >
        //     <Box
        //       sx={{
        //         width: "100%",
        //         display: "grid",
        //         gridTemplateColumns: "1fr 1fr 1fr 1fr",
        //       }}
        //     >
        //       <ListHeader>Order ID</ListHeader>
        //       <ListHeader>Time</ListHeader>
        //       <ListHeader>Status</ListHeader>
        //       <ListHeader>Download</ListHeader>
        //     </Box>
        //     <Box sx={{
        //       height: "35%",
        //       width: "100%",
        //       overflowY: "scroll",
        //     }}>
        //       {ordersList && ordersList.map((doc, index) => {
        //         const item = doc.data()
        //         item.id = doc.id
        //         const creationDate = new Date(Number(item.creationTime))
        //         return (
        //           <>
        //             <OrdersItemsCard key={item.id} item={item} creationDate={creationDate} />
        //           </>
        //         )
        //       })}
        //     </Box>
        //   </Box>
        // )
      }
    </Box>
  );
};

export default UserDetails;
