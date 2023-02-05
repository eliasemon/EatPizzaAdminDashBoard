import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, cssTransition } from "react-toastify";
import { Backdrop, CircularProgress } from "@mui/material";
const Loading = () => {
  return (
    <div
      style={{
        zIndex: 100000,
        position: "fixed",
        background: "rgba(0,0,0,.5)",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size="3rem" color="inherit" />
    </div>
  );
};

const Zoom = cssTransition({
  collapseDuration: 0,
  enter: "swirl-in-fwd",
  exit: "swirl-out-bck",
});

export const showLoading = () => {
  toast(<Loading />, {
    transition: Zoom,
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    toastId: "LoadingSc",
  });
};

export const closeLoading = () => toast.done("LoadingSc");
