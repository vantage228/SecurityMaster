import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Box } from '@mui/material';
import axios from 'axios';
import Navbar from './Navbar';

const EquityLogTable = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
        if(!isAuthenticated)
            window.location.href = "/auth";

        const fetchLogs = async () => {
            try {
                const response = await axios.get('https://localhost:7298/api/log');
                console.log(response.data)
                setLogs(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch logs');
                setLoading(false);
            }
        };
        
        fetchLogs();
        //eslint-disable-next-line
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" variant="h6" align="center" mt={5}>
                {error}
            </Typography>
        );
    }

    return (
        <>
        <Navbar/>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Log ID</strong></TableCell>
                        <TableCell><strong>Security ID</strong></TableCell>
                        <TableCell><strong>Update Time</strong></TableCell>
                        <TableCell><strong>Updated By</strong></TableCell>
                        <TableCell><strong>Field Updated</strong></TableCell>
                        <TableCell><strong>Old Value</strong></TableCell>
                        <TableCell><strong>New Value</strong></TableCell>
                        <TableCell><strong>Update Status</strong></TableCell>
                        <TableCell><strong>Error Message</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.filter(equity=>equity.tableType==='Bond').map((log) => (
                        <TableRow key={log.logId}>
                            <TableCell>{log.logId}</TableCell>
                            <TableCell>{log.securityId}</TableCell>
                            <TableCell>{new Date(log.updateTime).toLocaleString()}</TableCell>
                            <TableCell>{log.updatedBy}</TableCell>
                            <TableCell>{log.fieldUpdated}</TableCell>
                            <TableCell>{log.oldValue}</TableCell>
                            <TableCell>{log.newValue}</TableCell>
                            <TableCell>{log.updateStatus}</TableCell>
                            <TableCell>{log.errorMessage || 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

export default EquityLogTable;
