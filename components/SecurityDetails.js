import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import '../assets/Equity2.css'

const SecurityDetails = ({ open, setOpen, securityID }) => {
  const [securityDetails, setSecurityDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;

    const fetchSecurityDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://localhost:7298/api/Equity/getSecurityByID/${securityID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch security details");
        }
        const data = await response.json();
        setSecurityDetails(data[0]); // Assuming the API returns an array of one object
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSecurityDetails();
  }, [open, securityID]);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {loading
          ? "Loading Security Details..."
          : `Security Details for ID: ${securityID}`}
        <Button  onClick={handleClose}>Close</Button>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Error: {error}</Typography>
        ) : (
            <form>
            <Grid container spacing={2}>
              {Object.entries(securityDetails).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    sx={{marginY:"5px"}}
                    label={key}
                    value={value === null || value === "" ? "N/A" : value}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                        sx: { color: "white" }, // Input text color
                      }}
                      InputLabelProps={{
                        style: { color: "white", fontSize: "1.2rem" }, // Increase font size of the label
                      }}
                  />
                </Grid>
              ))}
            </Grid>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SecurityDetails;
