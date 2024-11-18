// Bonds.js
import React, { useReducer, useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { bondReducer, initialState, fetchBonds, setEditBond, closeModal, editBond, deleteBond } from './BondSlice';
import TileComponent from './TileComponent';
import CircularProgress from '@mui/material/CircularProgress';
import SecurityDetails from './SecurityDetails';

const Bonds = () => {
    const [displayAllDetailDialog, setDisplayAllDetailDialog] = useState(false)
    const [displaySecurityID, setDisplaySecurityID] = useState('')

    const [state, dispatch] = useReducer(bondReducer, initialState);
    const [activeBond, setactiveBond] = useState(true)

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
        setDisplaySecurityID(id)
    }

    useEffect(() => {
        fetchBonds(dispatch);
    }, []);

    const investmentGradeRatings = [
        { value: "AAA", label: "AAA (highest quality)" },
        { value: "AA+", label: "AA+" },
        { value: "AA", label: "AA" },
        { value: "AA-", label: "AA-" },
        { value: "A+", label: "A+" },
        { value: "A", label: "A" },
        { value: "A-", label: "A-" },
        { value: "BBB+", label: "BBB+" },
        { value: "BBB", label: "BBB" },
        { value: "BBB-", label: "BBB- (lowest investment grade)" },
    ];

    const handleActiveBond = () => {
        setactiveBond(true)
        console.log('Bond', activeBond)
    }

    const handleInactiveBond = () => {
        setactiveBond(false)
        console.log('Bond', activeBond)
    }

    return (
        <div>
            {state.loading ? (
                <Box sx={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress size="5rem" />
                </Box>
            ) : (
                <>
                    <TileComponent handleActiveBond={handleActiveBond} handleInactiveBond={handleInactiveBond} activeCount={state.bondData.filter(b => b.isActive).length} inactiveCount={state.bondData.filter(b => !b.isActive).length} />
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
                            {(activeBond) ?
                                <TableBody>
                                    {state.bondData.filter(security => security.isActive).map((bond) => (
                                        <TableRow key={bond.securityID}>
                                            <TableCell>
                                                <Button onClick={() => getDetail(bond.securityID)}>{bond.securityID}
                                                </Button>
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
                                :
                                <TableBody>
                                    {state.bondData.filter(security => !security.isActive).map((bond) => (
                                        <TableRow key={bond.securityID}>
                                            <TableCell>{bond.securityID}</TableCell>
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
                            }
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
                    <TextField name="maturityDate" label="Maturity Date" type="date" fullWidth margin="dense" disabled value={state.editBondData.maturityDate.split("T")[0]} onChange={handleInputChange} />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="isCallable-label">Is Callable</InputLabel>
                        <Select labelId="isCallable-label" name="isCallable" value={state.editBondData.isCallable} onChange={handleInputChange}>
                            <MenuItem value={true}>True</MenuItem>
                            <MenuItem value={false}>False</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Bonds;
