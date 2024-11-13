import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} justifyContent="center" style={{ marginTop: '2rem' }}>
      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Security Master Viewer
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

      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              File Uploader
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
  );
}

export default LandingPage;
