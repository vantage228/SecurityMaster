import React from 'react';
import { Card, Typography, Box, Button } from '@mui/material';

const TileComponent = ({ activeCount, inactiveCount, tabValue, handleActive, handleInactive, handleInactiveBond, handleActiveBond }) => {
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{
          width: "15vw", height: "10vw", border: "2px solid black", display: "flex", flexDirection: "column", alignContent: "center", padding: "10px", margin: "2px", backgroundColor: "#e8f5e9", borderColor: "#2e7d32"
        }}>
          <Typography variant='h6' sx={{ textAlign: "center" }}>
            {(tabValue === 0) ? "Active Equities" : "Active Bonds"}
            <img src={require('../assets/checked.png')} style={{
              height: '35px',
              width: '35px',
              marginLeft: '12px',
              marginBottom: '-10px'
            }} alt='Security-Master_Logo' />
          </Typography>
          <Typography variant='h1' sx={{ textAlign: "center" }}>
            {activeCount}
          </Typography>
          <Button sx={{ margin: "2px" }} variant="contained" color="secondary" onClick={() => { (tabValue === 0) ? handleActive() : handleActiveBond() }}>View Active</Button>
        </Card>
        <Card sx={{
          width: "15vw", height: "10vw", border: "2px solid black", display: "flex", flexDirection: "column", alignContent: "center", padding: "10px", margin: "2px",
          backgroundColor: "#ffebee", borderColor: "#c62828",
        }}>
          <Typography variant='h6' sx={{ textAlign: "center" }}>
            {(tabValue === 0) ? "Inactive Equities" : "Inactive Bonds"}
            <img src={require('../assets/cancel.png')} style={{
              height: '35px',
              width: '35px',
              marginLeft: '12px',
              marginBottom: '-10px'
            }} alt='Security-Master_Logo' />
          </Typography>
          <Typography variant='h1' sx={{ textAlign: "center" }}>
            {inactiveCount}
          </Typography>
          <Button sx={{ margin: "2px" }} variant="contained" color="secondary" onClick={() => { (tabValue === 0) ? handleInactive() : handleInactiveBond() }}>View Inactive</Button>
        </Card>
      </Box>
    </div>
  );
};

export default TileComponent;
