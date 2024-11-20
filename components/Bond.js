import React, { useState, useEffect } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import TileComponent from './TileComponent';
// import CircularProgress from '@mui/material/CircularProgress';

const Bond = () => {
    const [editBondData, setEditBondData] = useState({
        securityID: "",
        securityDescription: "",
        securityName: "",
        coupon: "",
        maturityDate: "",
        isCallable: "",
        penultimateCouponDate: "",
        formPFCreditRating: "",
        askPrice: "",
        bidPrice: "",
        isActive: ""
    });
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [bondData, setBondData] = useState([])
    const fetchBonds = () => {
        axios.get("https://localhost:7298/api/Bond")
            .then((response) => {
                setBondData(response.data)
            })
            .catch((e) => {
                alert('Error - ' + e)
            })
    }
    const handleEditClick2 = (rowData) => {
        setEditBondData({
            securityID: rowData.securityID || "",
            securityDescription: rowData.securityDescription || "",
            securityName: rowData.securityName || "",
            coupon: rowData.coupon || "",
            maturityDate: rowData.maturityDate || "",
            isCallable: Boolean(rowData.isCallable) || "",
            penultimateCouponDate: rowData.penultimateCouponDate || "",
            formPFCreditRating: rowData.formPFCreditRating || "",
            askPrice: rowData.askPrice || "",
            bidPrice: rowData.bidPrice || "",
            isActive: rowData.isActive || ""
        });
        setIsModalOpen2(true);
    };
    const handleModalClose2 = () => {
        setIsModalOpen2(false);
        setEditBondData({
            securityID: "",
            securityDescription: "",
            securityName: "",
            coupon: "",
            maturityDate: "",
            isCallable: "",
            penultimateCouponDate: "",
            formPFCreditRating: "",
            askPrice: "",
            bidPrice: "",
            isActive: ""
        });
    };
    const handleInputChange2 = (e) => {
        const { name, value } = e.target;
        setEditBondData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit2 = (e) => {
        e.preventDefault();
        const url = 'https://localhost:7298/api/Bond/edit';
        const method = 'put';

        const dataToSend = {
            securityID: editBondData.securityID || 0,
            securityDescription: editBondData.securityDescription || "string",
            securityName: editBondData.securityName || "string",
            coupon: editBondData.coupon || 0,
            maturityDate: editBondData.maturityDate || "2024-11-13T19:21:50.662Z",
            isCallable: Boolean(editBondData.isCallable) || false,
            penultimateCouponDate: editBondData.penultimateCouponDate || "2024-11-13T19:21:50.662Z",
            formPFCreditRating: editBondData.formPFCreditRating || "string",
            askPrice: editBondData.askPrice || 0,
            bidPrice: editBondData.bidPrice || 0,
            isActive: editBondData.isActive || true
        };

        axios({
            method: method,
            url: url,
            data: dataToSend
        })
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    alert(`Data Edited Successfully`);
                    setEditBondData({
                        securityID: "",
                        securityDescription: "",
                        securityName: "",
                        coupon: "",
                        maturityDate: "",
                        isCallable: "",
                        penultimateCouponDate: "",
                        formPFCreditRating: "",
                        askPrice: "",
                        bidPrice: "",
                        isActive: ""
                    });
                    fetchBonds();
                }
            })
            .catch((error) => {
                if (error.response) {
                    alert('Server responded with error:', error.response.data);
                } else if (error.request) {
                    alert('No response received:', error.request);
                } else {
                    alert('Error message:', error.message);
                }
            });
        handleModalClose2();
    };
    const handleDeleteClick2 = (id) => {
        const confirmDelete = window.confirm('Do you want to set Bond as Inactive?')
        if (confirmDelete) {
            axios.delete(`https://localhost:7298/api/Bond/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        alert("Bond marked as Inactive")
                        fetchBonds()
                    }
                })
                .catch((error) => {
                    alert("Error:", error)
                })
        }
    }
    const activeBondCount = bondData.filter(security => security.isActive === true).length;
    const inactiveBondCount = bondData.filter(security => security.isActive === false).length;

    useEffect(() => {
        fetchBonds()
    }, [])
    return (
        <div>
            <TileComponent activeCount={activeBondCount} inactiveCount={inactiveBondCount} />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Security ID</TableCell>
                            <TableCell>Security Name</TableCell>
                            <TableCell>Security Description</TableCell>
                            <TableCell>Coupon</TableCell>
                            <TableCell>Penultimate CouponDate</TableCell>
                            <TableCell>Pf CreditRating</TableCell>
                            <TableCell>Maturity Date</TableCell>
                            <TableCell>Is Callable</TableCell>
                            <TableCell>Ask Price</TableCell>
                            <TableCell>Bid Price</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bondData.map((row) => (
                            <TableRow key={row.securityID}>
                                <TableCell>{row.securityID}</TableCell>
                                <TableCell>{row.securityName}</TableCell>
                                <TableCell>{row.securityDescription}</TableCell>
                                <TableCell>{row.coupon}</TableCell>
                                <TableCell>{new Date(row.penultimateCouponDate).toLocaleDateString()}</TableCell>
                                <TableCell>{row.formPFCreditRating}</TableCell>
                                <TableCell>{new Date(row.maturityDate).toLocaleDateString()}</TableCell>
                                <TableCell>{(row.isCallable) ? 'true' : 'false'}</TableCell>
                                <TableCell>{row.askPrice}</TableCell>
                                <TableCell>{row.bidPrice}</TableCell>
                                <TableCell>{row.isActive ? 'True' : 'False'}</TableCell>
                                <TableCell sx={{ display: "flex" }}>
                                    <Button sx={{ margin: "2px" }} variant="contained" color="primary" onClick={() => handleEditClick2(row)}>Edit</Button>
                                    <Button sx={{ margin: "2px", backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "darkred" } }} variant="contained" color="primary" onClick={() => handleDeleteClick2(row.securityID)}>Deactivate</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Editing Table */}
            <Dialog open={isModalOpen2} onClose={handleModalClose2}>
                <DialogTitle>Edit Bond Data</DialogTitle>
                <DialogContent>
                    <TextField
                        name="securityName"
                        label="Security Name"
                        fullWidth
                        margin="dense"
                        disabled
                        value={editBondData?.securityName || ""}
                        onChange={handleInputChange2}
                    />
                    <TextField
                        name="securityDescription"
                        label="Description"
                        fullWidth
                        margin="dense"
                        value={editBondData?.securityDescription || ""}
                        onChange={handleInputChange2}
                    />
                    <TextField
                        name="coupon"
                        label="Coupon"
                        type='number'
                        fullWidth
                        margin="dense"
                        value={editBondData?.coupon || ""}
                        onChange={handleInputChange2}
                    />
                    <TextField
                        name="penultimateCouponDate"
                        label="Penultimate Coupon Date"
                        type='date'
                        fullWidth
                        margin="dense"
                        value={editBondData ? editBondData.penultimateCouponDate.split("T")[0] : ""}
                        onChange={handleInputChange2}
                    />
                    <TextField
                        name="pfCreditRating"
                        label="PF Credit Rating"
                        fullWidth
                        margin="dense"
                        value={editBondData?.formPFCreditRating || ""}
                        onChange={handleInputChange2}
                    />
                    <TextField
                        name="askPrice"
                        label="Ask Price"
                        fullWidth
                        type='number'
                        margin="dense"
                        value={editBondData?.askPrice || ""}
                        onChange={handleInputChange2}
                    />
                    <TextField
                        name="bidPrice"
                        label="Bid Price"
                        type='number'
                        fullWidth
                        margin="dense"
                        value={editBondData?.bidPrice || ""}
                        onChange={handleInputChange2}
                    />
                    <TextField
                        name="maturityDate"
                        label="Maturity Date"
                        disabled
                        fullWidth
                        margin="dense"
                        type='date'
                        value={editBondData ? editBondData.maturityDate.split("T")[0] : ""}
                        onChange={handleInputChange2}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="isCallable-label">Is Callable</InputLabel>
                        <Select
                            labelId="isCallable-label"
                            name="isCallable"
                            label="Is Callable"
                            value={editBondData ? Boolean(editBondData.isCallable) : false}
                            onChange={handleInputChange2}
                        >
                            <MenuItem value={true}>True</MenuItem>
                            <MenuItem value={false}>False</MenuItem>
                        </Select>
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose2} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit2} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Bond