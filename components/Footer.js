import React from 'react'
import {
    Typography,
    Box,
  } from "@mui/material";

const Footer = () => {
  return (
    <div>
        <Box
          sx={{
            mt: 4,
            py: 2,
            background: "#1e3c72",
            textAlign: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} IVP Security Reference Master. All
            rights reserved.
          </Typography>
        </Box>
    </div>
  )
}

export default Footer