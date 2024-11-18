import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Card, CardContent } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Navbar from './Navbar';

function FileUploader() {
  const [files, setFiles] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDownloadTemplate = (templateType) => {
    const fileUrl = templateType === 'Equity'
      ? '/templates/EquitiesTemplate.csv'
      : '/templates/BondsTemplate.csv';

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${templateType}Template.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert('Please upload a file before submitting.');
      return;
    }
    const formData = new FormData();
    formData.append('file', files[0]);

    setUploading(true);

    try {
      const apiUrl = selectedCard === 'Equity'
        ? 'https://localhost:7298/api/equity/upload'
        : 'https://localhost:7298/api/Bond/upload';

      const response = await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      (response.data.includes("Database Error"))? alert('DB Error: Duplicate Security Name Not Allowed'): alert(response.data)
    }
    catch (error) {
      alert(`Error: ${error.response?.data || 'An error occurred while uploading the file.'}`);
    } 
    finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if(!isAuthenticated)
      window.location.href = "/auth";
  }, [])


  return (
    <div style={{minHeight:"90vh"}}>
      <Navbar />
      <Grid container direction="column" alignItems="center" style={{ marginTop: '2rem' }}>
        <Typography variant="h4">Upload CSV Files</Typography>

        {!selectedCard ? (
          <Grid container spacing={3} justifyContent="center" style={{ marginTop: '2rem' }}>
            <Grid item>
              <Card onClick={() => setSelectedCard('Equity')} style={{ cursor: 'pointer', width: '200px', textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h6">Equity
                    <img src={require('../assets/equity.png')} style={{
                      height: '35px',
                      width: '35px',
                      marginLeft: '12px',
                      marginBottom: '-10px'
                    }} alt='Security-Master_Logo' />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card onClick={() => setSelectedCard('Bond')} style={{ cursor: 'pointer', width: '200px', textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h6">Bond
                    <img src={require('../assets/bond.png')} style={{
                      height: '35px',
                      width: '35px',
                      marginLeft: '12px',
                      marginBottom: '-10px'
                    }} alt='Security-Master_Logo' />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Grid container direction="column" alignItems="center" style={{ marginTop: '2rem', width: '50%' }}>
            <Typography variant="h5">{`${selectedCard} CSV Upload`}</Typography>

            <Grid item {...getRootProps()} style={{ border: '2px dashed gray', padding: '2rem', marginTop: '1rem', width: '100%' }}>
              <input {...getInputProps()} />
              <Typography>Drag & drop your {selectedCard.toLowerCase()} files here, or click to select</Typography>
            </Grid>

            <Grid item style={{ marginTop: '1rem' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDownloadTemplate(selectedCard)}
              >
                Download {selectedCard} Template
              </Button>
            </Grid>

            <Grid item style={{ marginTop: '1rem' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Submit'}
              </Button>
            </Grid>

            <Grid item style={{ marginTop: '2rem' }}>
              <Button
                variant="outlined"
                onClick={() => setSelectedCard(null)}
              >
                Back to Selection
              </Button>
            </Grid>

            <Grid item style={{ marginTop: '1rem' }}>
              <Typography variant="h6">Uploaded Files:</Typography>
              {files.map((file, index) => (
                <Typography key={index}>{file.name}</Typography>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default FileUploader;
