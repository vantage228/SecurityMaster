import React from 'react';
import {Typography, Button, Card, CardContent, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';



function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="md" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to IVP Security Reference Master (SRM)
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          The IVP Security Reference Master (SRM) is a comprehensive platform for managing and viewing
          securities data with ease. This platform offers a streamlined solution for accessing,
          updating, and uploading essential security information, ensuring accuracy and efficiency
          in your financial operations.
        </Typography>
        <Grid container spacing={4} justifyContent="center" style={{ marginTop: '2rem' }}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Security Master Viewer
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  View detailed information on securities and manage your security data effectively.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                  onClick={() => navigate('/security-master')}
                >
                  View Securities
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card >
              <CardContent sx={{height:"143px"}}> 
                <Typography variant="h5" component="div">
                  File Uploader
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Upload files to update security data quickly and efficiently.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                  onClick={() => navigate('/file-upload')}
                >
                  Upload Files
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default LandingPage;
