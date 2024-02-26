import React from "react";

import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material/";

const ConfirmationBox = ({ data }) => {
  const { dialogOpen, setDialogOpen, message, agreeFunction } = data;
  const handleClose = () => {
    agreeFunction && agreeFunction();
    setDialogOpen(false);
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ backgroundColor: "#454545" }}>
        <DialogTitle id="alert-dialog-title" sx={{ color: "#fff" }}>
          Need to confirm before operation
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "#fff" }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Disagree
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Agree
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmationBox;
