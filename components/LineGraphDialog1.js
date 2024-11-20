import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import TickerChart from "./TickerChart";

const LineGraphDialog1 = ({ open, onClose }) => {
  const [ticker, setTicker] = useState("");
  const [showChart, setShowChart] = useState(false);

  const handleSubmit = () => {
    if (ticker.trim()) {
      setShowChart(true);
    }
  };

  const handleDialogClose = () => {
    setTicker("");
    setShowChart(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>Enter Ticker</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            backgroundColor: "#f0f4f8", 
            padding: 2,
            borderRadius: 1,
          }}
        >
          <TextField
            label="Ticker"
            fullWidth
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            sx={{
              marginBottom: 2,
              backgroundColor: "#331a00",
              borderRadius: 1,
            }}
            InputProps={{
              style: { color: "black" }, 
            }}
          />
          {showChart && (
            <Box
              sx={{
                backgroundColor: "#ffffff", 
                padding: 2,
                borderRadius: 1,
                color: "#000000"
              }}
            >
              <TickerChart ticker={ticker} />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LineGraphDialog1;
