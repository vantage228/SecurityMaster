import React from 'react';
import { Card, Typography, Box } from '@mui/material';

const TileComponent = ({ activeCount, inactiveCount, tabValue }) => {
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{
          width: "15vw", height: "10vw", border: "2px solid black", display: "flex", flexDirection: "column", alignContent: "center", padding: "10px", margin: "2px", backgroundColor: "#e8f5e9", borderColor: "#2e7d32"
        }}>
          <Typography variant='h6' sx={{ textAlign: "center" }}>
            {(tabValue === 0) ? "Active Equities" : "Active Bonds"}
          </Typography>
          <Typography variant='h1' sx={{ textAlign: "center" }}>
            {activeCount}
          </Typography>
        </Card>
        <Card sx={{
          width: "15vw", height: "10vw", border: "2px solid black", display: "flex", flexDirection: "column", alignContent: "center", padding: "10px", margin: "2px",
          backgroundColor: "#ffebee", borderColor: "#c62828",
        }}>
          <Typography variant='h6' sx={{ textAlign: "center" }}>
            {(tabValue === 0) ? "Inactive Equities" : "Inactive Bonds"}
          </Typography>
          <Typography variant='h1' sx={{ textAlign: "center" }}>
            {inactiveCount}
          </Typography>
        </Card>
      </Box>
    </div>
  );
};

export default TileComponent;
