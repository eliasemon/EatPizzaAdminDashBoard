import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import product from "../../../assets/images/profile.jpg";

import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "@mui/material";
import UserDetails from "./UserDetails";
import avatar from "../../../assets/images/avatar.png";

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

const UsersListCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      key={item.id}
      sx={{
        // height: "35%",
        // width: "35%",
        flex: 1,
        display: "grid",
        gridTemplateColumns: "2fr 2fr 1fr",
      }}
    >
      <ListBody
        onClick={handleOpen}
        sx={{
          justifyContent: "flex-start",
          padding: "1rem 0 1rem 10rem",

          // justifyContent: "flex",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <img
          src={item.photoURL ?? avatar}
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
        <Typography sx={{ color: "#fff" }}>
          {/* {console.log(item.isRestricted)} */}
        </Typography>
      </ListBody>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <UserDetails user={item} />
      </Modal>
    </Box>
  );
};
export default UsersListCard;

// <ListBody>
//
//                 </ListBody>
