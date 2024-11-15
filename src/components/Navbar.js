import React from 'react'
import { Typography, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        IVP Security Reference Master (SRM)
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/')}>
                        Home
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/security-master')}>
                        Security Master Viewer
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/file-upload')}>
                        File Uploader
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar

