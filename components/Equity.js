import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import axios from 'axios';
import TileComponent from './TileComponent';
import CircularProgress from '@mui/material/CircularProgress';

const Equity = ({ tabValue }) => {
    const [editData, setEditData] = useState({
        securityId: "",
        securityName: "",
        description: "",
        isActive: "",
        pricingCurrency: "",
        totalSharesOutstanding: "",
        openPrice: "",
        closePrice: "",
        dividendDeclaredDate: "",
        pfCreditRating: ""
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [equityData, setequityData] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [active, setactive] = useState(true)

    const fetchEquities = () => {
        setisLoading(true)
        axios.get("https://localhost:7298/api/Equity")
            .then((response) => {
                setisLoading(false)
                setequityData(response.data)
            })
            .catch((e) => {
                setisLoading(false)
                alert('Error - ' + e)
            })
    }
    const handleEditClick = (rowData) => {
        setEditData({
            securityId: rowData.securityId || "",
            securityName: rowData.securityName || "",
            description: rowData.description || "",
            pricingCurrency: rowData.pricingCurrency || "",
            totalSharesOutstanding: rowData.totalSharesOutstanding || "",
            openPrice: rowData.openPrice || "",
            closePrice: rowData.closePrice || "",
            dividendDeclaredDate: rowData.dividendDeclaredDate || "",
            pfCreditRating: rowData.pfCreditRating || ""
        });
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditData({
            securityId: "",
            securityName: "",
            description: "",
            pricingCurrency: "",
            totalSharesOutstanding: "",
            openPrice: "",
            closePrice: "",
            dividendDeclaredDate: "",
            pfCreditRating: ""
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `https://localhost:7298/api/equity/edit`;
        const method = 'put';

        axios({
            method: method,
            url: url,
            data: editData
        })
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    alert(`Data Edited Successfully`);
                    setEditData({
                        securityId: "",
                        securityName: "",
                        description: "",
                        pricingCurrency: "",
                        totalSharesOutstanding: "",
                        openPrice: "",
                        closePrice: "",
                        dividendDeclaredDate: "",
                        pfCreditRating: ""
                    });
                    fetchEquities();
                }
            })
            .catch((error) => {
                alert("Error submitting data:", error);
            });
        handleModalClose();
    };

    const handleDeleteClick = (id) => {
        const confirmDelete = window.confirm('Do you want to set Equity as Inactive?')
        if (confirmDelete) {
            axios.delete(`https://localhost:7298/api/equity/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        alert("Equity marked as Inactive")
                        fetchEquities()
                    }
                })
                .catch((error) => {
                    alert("Error:", error)
                })
        }
    }

    const activeEquityCount = equityData.filter(security => security.isActive === true).length;
    const inactiveEquityCount = equityData.filter(security => security.isActive === false).length;

    useEffect(() => {
        fetchEquities()
    }, [])

    const handleActive = () => {
        setactive(true)
    }

    const handleInactive = () => {
        setactive(false)
    }
    return (
        <div>
            {(isLoading) ?
                <Box sx={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress size="5rem" />
                </Box>
                :
                <>
                    <TileComponent handleActive={handleActive} handleInactive={handleInactive} activeCount={activeEquityCount} inactiveCount={inactiveEquityCount} tabValue={tabValue} />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Security ID</TableCell>
                                    <TableCell>Security Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell>Pricing Currency</TableCell>
                                    <TableCell>Total Shares Outstanding</TableCell>
                                    <TableCell>Open Price</TableCell>
                                    <TableCell>Close Price</TableCell>
                                    <TableCell>Dividend Declared Date</TableCell>
                                    <TableCell>PF Credit Rating</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            {(active) ?
                                <TableBody>
                                    {equityData.filter(security => security.isActive === true).map((row) => (
                                        <TableRow key={row.securityId}>
                                            <TableCell>{row.securityId}</TableCell>
                                            <TableCell>{row.securityName}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>{(row.isActive === true) ? "true" : "false"}</TableCell>
                                            <TableCell>{row.pricingCurrency}</TableCell>
                                            <TableCell>{row.totalSharesOutstanding}</TableCell>
                                            <TableCell>{row.openPrice}</TableCell>
                                            <TableCell>{row.closePrice}</TableCell>
                                            <TableCell>{new Date(row.dividendDeclaredDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{row.pfCreditRating}</TableCell>
                                            <TableCell sx={{ display: "flex" }}>
                                                <Button sx={{ margin: "2px" }} variant="contained" color="primary" onClick={() => handleEditClick(row)}>Edit</Button>
                                                <Button sx={{ margin: "2px", backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "darkred" } }} variant="contained" onClick={() => handleDeleteClick(row.securityId)}>Deactivate</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                :
                                <TableBody>
                                    {equityData.filter(security => security.isActive === false).map((row) => (
                                        <TableRow key={row.securityId}>
                                            <TableCell>{row.securityId}</TableCell>
                                            <TableCell>{row.securityName}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>{(row.isActive === true) ? "true" : "false"}</TableCell>
                                            <TableCell>{row.pricingCurrency}</TableCell>
                                            <TableCell>{row.totalSharesOutstanding}</TableCell>
                                            <TableCell>{row.openPrice}</TableCell>
                                            <TableCell>{row.closePrice}</TableCell>
                                            <TableCell>{new Date(row.dividendDeclaredDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{row.pfCreditRating}</TableCell>
                                            <TableCell sx={{ display: "flex" }}>
                                                <Button disabled sx={{ margin: "2px" }} variant="contained" color="primary" onClick={() => handleEditClick(row)}>Edit</Button>
                                                <Button disabled sx={{ margin: "2px", backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "darkred" } }} variant="contained" onClick={() => handleDeleteClick(row.securityId)}>Deactivate</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            }
                        </Table>
                    </TableContainer>
                </>
            }
            {/* Modal for editing data */}
            <Dialog open={isModalOpen} onClose={handleModalClose}>
                <DialogTitle>Edit Equity Data</DialogTitle>
                <DialogContent>
                    <TextField
                        name="securityName"
                        label="Security Name"
                        disabled
                        fullWidth
                        margin="dense"
                        value={editData?.securityName || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        fullWidth
                        margin="dense"
                        value={editData?.description || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="pricingCurrency"
                        label="Pricing Currency"
                        fullWidth
                        margin="dense"
                        value={editData?.pricingCurrency || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="totalSharesOutstanding"
                        label="Total Shares Outstanding"
                        fullWidth
                        margin="dense"
                        type="number"
                        value={editData?.totalSharesOutstanding || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="openPrice"
                        label="Open Price"
                        fullWidth
                        margin="dense"
                        type="number"
                        value={editData?.openPrice || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="closePrice"
                        label="Close Price"
                        fullWidth
                        margin="dense"
                        type="number"
                        value={editData?.closePrice || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="dividendDeclaredDate"
                        label="Dividend Declared Date"
                        fullWidth
                        margin="dense"
                        type="date"
                        value={editData ? editData.dividendDeclaredDate.split("T")[0] : ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="pfCreditRating"
                        label="PF Credit Rating"
                        fullWidth
                        margin="dense"
                        value={editData?.pfCreditRating || ""}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Equity