// Bonds.js
import React, { useReducer, useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { bondReducer, initialState, fetchBonds, setEditBond, closeModal, editBond, deleteBond } from './BondSlice';
import TileComponent from './TileComponent';
import SecurityDetails from './SecurityDetails';

const investmentGradeRatings = [
    { value: 'AAA', label: 'AAA' },
    { value: 'AA+', label: 'AA+' },
    { value: 'AA', label: 'AA' },
    { value: 'AA-', label: 'AA-' },
    { value: 'A+', label: 'A+' },
    { value: 'A', label: 'A' },
    { value: 'A-', label: 'A-' },
    { value: 'BBB+', label: 'BBB+' },
    { value: 'BBB', label: 'BBB' },
    { value: 'BBB-', label: 'BBB-' }
];

const Bonds = () => {
    const [displayAllDetailDialog, setDisplayAllDetailDialog] = useState(false);
    const [displaySecurityID, setDisplaySecurityID] = useState('');
    const [state, dispatch] = useReducer(bondReducer, initialState);
    const [activeBond, setActiveBond] = useState(true);

    
    const [filterName, setFilterName] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');

    const handleResetFilters = () => {
        setFilterName('')
        setFilterStartDate('')
        setFilterEndDate('')
    }

    useEffect(() => {
        fetchBonds(dispatch);
    }, []);

    const handleEditClick = (bond) => {
        setEditBond(dispatch, bond);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: 'SET_EDIT_BOND',
            payload: { ...state.editBondData, [name]: value }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editBond(dispatch, state.editBondData);
    };

    const handleDeleteClick = (id) => {
        deleteBond(dispatch, id);
    };

    const handleModalClose = () => {
        closeModal(dispatch);
    };

    const getDetail = (id) => {
        setDisplayAllDetailDialog(true);
        setDisplaySecurityID(id);
    };

    // Added filter logic
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'filterName') setFilterName(value);
        if (name === 'filterStartDate') setFilterStartDate(value);
        if (name === 'filterEndDate') setFilterEndDate(value);
    };

    const filteredData = state.bondData
        .filter((bond) => {
            // Filter by name
            if (filterName && !bond.securityName.toLowerCase().includes(filterName.toLowerCase())) return false;

            // Filter by date range
            if (filterStartDate || filterEndDate) {
                const bondDate = new Date(bond.maturityDate);
                if (filterStartDate && bondDate < new Date(filterStartDate)) return false;
                if (filterEndDate && bondDate > new Date(filterEndDate)) return false;
            }
            return true;
        })
        .filter((bond) => bond.isActive === activeBond);

    const handleActiveBond = () => {
        setActiveBond(true);
    };

    const handleInactiveBond = () => {
        setActiveBond(false);
    };

    return (
        <div>
            {state.loading ? (
                <Box sx={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress size="5rem" />
                </Box>
            ) : (
                <>
                    <TileComponent 
                        handleActiveBond={handleActiveBond} 
                        handleInactiveBond={handleInactiveBond} 
                        activeCount={state.bondData.filter(b => b.isActive).length} 
                        inactiveCount={state.bondData.filter(b => !b.isActive).length} 
                    />

                    {/* Added Filters */}
                    <Box sx={{ display: 'flex', justifyContent:"center", gap: 2, marginBottom: 2 , marginTop: 4}}>
                        <TextField
                            sx={{width:"30vw"}}
                            name="filterName"
                            label="Filter by Security Name"
                            variant="outlined"
                            fullWidth
                            value={filterName}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            name="filterStartDate"
                            label="Start Date"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={filterStartDate}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            name="filterEndDate"
                            label="End Date"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={filterEndDate}
                            onChange={handleFilterChange}
                        />
                        <Button variant='contained' color='warning' onClick={handleResetFilters}>Reset Filters</Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Security ID</TableCell>
                                    <TableCell>Security Name</TableCell>
                                    <TableCell>Security Description</TableCell>
                                    <TableCell>Coupon</TableCell>
                                    <TableCell>Penultimate Coupon Date</TableCell>
                                    <TableCell>PF Credit Rating</TableCell>
                                    <TableCell>Maturity Date</TableCell>
                                    <TableCell>Is Callable</TableCell>
                                    <TableCell>Ask Price</TableCell>
                                    <TableCell>Bid Price</TableCell>
                                    <TableCell>Is Active</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.map((bond) => (
                                    <TableRow key={bond.securityID}>
                                        <TableCell>
                                            <Button onClick={() => getDetail(bond.securityID)}>{bond.securityID}</Button>
                                        </TableCell>
                                        <TableCell>{bond.securityName}</TableCell>
                                        <TableCell>{bond.securityDescription}</TableCell>
                                        <TableCell>{bond.coupon}</TableCell>
                                        <TableCell>{new Date(bond.penultimateCouponDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{bond.formPFCreditRating}</TableCell>
                                        <TableCell>{new Date(bond.maturityDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{bond.isCallable ? 'True' : 'False'}</TableCell>
                                        <TableCell>{bond.askPrice}</TableCell>
                                        <TableCell>{bond.bidPrice}</TableCell>
                                        <TableCell>{bond.isActive ? 'True' : 'False'}</TableCell>
                                        <TableCell sx={{ width: "190px" }}>
                                            <Button sx={{ margin: "2px" }} variant="contained" color="primary" onClick={() => handleEditClick(bond)}>Edit</Button>
                                            <Button sx={{ margin: "2px", backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "darkred" } }} variant="contained" onClick={() => handleDeleteClick(bond.securityID)}>Deactivate</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}

            <SecurityDetails securityID={displaySecurityID} open={displayAllDetailDialog} setOpen={setDisplayAllDetailDialog} />

            <Dialog open={state.isModalOpen} onClose={handleModalClose}>
                <DialogTitle>Edit Bond Data</DialogTitle>
                <DialogContent>
                    <TextField name="securityName" label="Security Name" fullWidth margin="dense" disabled value={state.editBondData.securityName} onChange={handleInputChange} />
                    <TextField name="securityDescription" label="Description" fullWidth margin="dense" value={state.editBondData.securityDescription} onChange={handleInputChange} />
                    <TextField name="coupon" label="Coupon" type="number" fullWidth margin="dense" value={state.editBondData.coupon} onChange={handleInputChange} />
                    <TextField name="penultimateCouponDate" label="Penultimate Coupon Date" type="date" fullWidth margin="dense" value={state.editBondData.penultimateCouponDate.split("T")[0]} onChange={handleInputChange} />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="formPFCreditRating-label">PF Credit Rating</InputLabel>
                        <Select
                            labelId="formPFCreditRating-label"
                            name="formPFCreditRating"
                            value={state.editBondData.formPFCreditRating || ""}
                            onChange={handleInputChange}
                        >
                            {investmentGradeRatings.map((rating) => (
                                <MenuItem key={rating.value} value={rating.value}>
                                    {rating.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField name="askPrice" label="Ask Price" type="number" fullWidth margin="dense" value={state.editBondData.askPrice} onChange={handleInputChange} />
                    <TextField name="bidPrice" label="Bid Price" type="number" fullWidth margin="dense" value={state.editBondData.bidPrice} onChange={handleInputChange} />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="isCallable-label">Is Callable</InputLabel>
                        <Select
                            labelId="isCallable-label"
                            name="isCallable"
                            value={state.editBondData.isCallable || false}
                            onChange={handleInputChange}
                        >
                            <MenuItem value={true}>True</MenuItem>
                            <MenuItem value={false}>False</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                    <Button onClick={handleModalClose} variant="contained" color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Bonds;
