import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from '@mui/material/Backdrop';

export default function BackDrop({open}) {
  return (
    <div>
    {console.log("fffffffffffgvvvvvvv")}
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>
  )
}
