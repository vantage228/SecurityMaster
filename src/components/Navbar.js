import React from 'react'
import { Typography, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate('/auth')
    }
    return (
        <div>
            <AppBar position="static" color="primary" className='NavbarCS'>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        IVP Security Reference Master (SRM)
                        <img src={require('../assets/security.png')} style={{
                            height: '35px',
                            width: '35px',
                            marginLeft: '12px',
                            marginBottom: '-10px'
                        }} alt='Security-Master_Logo'/>
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
                    <Button color="inherit" onClick={() => navigate('/equity-log')}>
                        Equity Log
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/bond-log')}>
                        Bond Log
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/view-sp')}>
                        View
                    </Button>
                    <Button variant="contained" color="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar

