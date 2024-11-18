import React, { useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if(!isAuthenticated)
      window.location.href = "/auth";
  }, [])
  

  return (
    <>
      <Box
        sx={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
        >
        <Navbar/>
        <Container maxWidth="md" sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to IVP Security Reference Master (SRM)
          </Typography>
          <Typography
            variant="body1"
            color="inherit"
            paragraph
            sx={{ opacity: 0.9 }}
          >
            The IVP Security Reference Master (SRM) is a comprehensive platform
            for managing and viewing securities data with ease. This platform
            offers a streamlined solution for accessing, updating, and uploading
            essential security information, ensuring accuracy and efficiency in
            your financial operations.
          </Typography>
        </Container>

        <Container maxWidth="lg" sx={{ mt: 4, flexGrow: 1 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Card className="LandingCards"
                sx={{
                  color:"white",
                  display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                  background: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  borderRadius: "10px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                    Security Master Viewer
                    <img src={require('../assets/analysis.png')} style={{
                            height: '35px',
                            width: '35px',
                            marginLeft: '12px',
                            marginBottom: '-10px'
                        }} alt='Security-Master_Logo'/>
                  </Typography>
                  <Typography variant="body2" color="inherit" paragraph>
                    View detailed information on securities and manage your
                    security data effectively.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/security-master")}
                  >
                    View Securities
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  color:"white",
                  display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                  background: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  borderRadius: "10px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                    File Uploader
                    <img src={require('../assets/inbox.png')} style={{
                            height: '35px',
                            width: '35px',
                            marginLeft: '12px',
                            marginBottom: '-10px'
                        }} alt='Security-Master_Logo'/>
                  </Typography>
                  <Typography variant="body2" color="inherit" paragraph>
                    Upload files to update security data quickly and
                    efficiently.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/file-upload")}
                  >
                    Upload Files
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default LandingPage;
