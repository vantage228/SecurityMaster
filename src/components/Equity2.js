import React, { useEffect, useReducer } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, CircularProgress } from '@mui/material';
import { initialState, equityReducer, fetchEquities, editEquity, deleteEquity, setActive, openModal, closeModal, updateEditData } from './EquitySlice';
import TileComponent from './TileComponent';

const Equity2 = ({ tabValue }) => {
    const [state, dispatch] = useReducer(equityReducer, initialState);

    useEffect(() => {
        fetchEquities(dispatch);
    }, []);

    const handleEditClick = (rowData) => {
        openModal(dispatch, rowData);
    };

    const handleModalClose = () => {
        closeModal(dispatch);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateEditData(dispatch, name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editEquity(dispatch, state.editData);
    };

    const handleDeleteClick = (id) => {
        deleteEquity(dispatch, id);
    };

    const handleActive = () => {
        setActive(dispatch, true);
    };

    const handleInactive = () => {
        setActive(dispatch, false);
    };

    const activeEquityCount = state.equityData.filter(security => security.isActive === true).length;
    const inactiveEquityCount = state.equityData.filter(security => security.isActive === false).length;

    return (
        <div>
            {state.isLoading ? (
                <Box sx={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress size="5rem" />
                </Box>
            ) : (
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
                            <TableBody>
                                {state.equityData.filter(security => security.isActive === state.active).map((row) => (
                                    <TableRow key={row.securityId}>
                                        <TableCell>{row.securityId}</TableCell>
                                        <TableCell>{row.securityName}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.isActive ? "true" : "false"}</TableCell>
                                        <TableCell>{row.pricingCurrency}</TableCell>
                                        <TableCell>{row.totalSharesOutstanding}</TableCell>
                                        <TableCell>{row.openPrice}</TableCell>
                                        <TableCell>{row.closePrice}</TableCell>
                                        <TableCell>{new Date(row.dividendDeclaredDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{row.pfCreditRating}</TableCell>
                                        <TableCell sx={{ display: "flex" }}>
                                            <Button sx={{ margin: "2px" }} disabled variant="contained" color="primary" onClick={() => handleEditClick(row)}>Edit</Button>
                                            <Button sx={{ margin: "2px", backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "darkred" } }} disabled variant="contained" onClick={() => handleDeleteClick(row.securityId)}>Deactivate</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}

            <Dialog open={state.isModalOpen} onClose={handleModalClose}>
                <DialogTitle>Edit Equity Data</DialogTitle>
                <DialogContent>
                    <TextField
                        name="securityName"
                        label="Security Name"
                        fullWidth
                        margin="dense"
                        value={state.editData.securityName || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        fullWidth
                        margin="dense"
                        value={state.editData.description || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="pricingCurrency"
                        label="Pricing Currency"
                        fullWidth
                        margin="dense"
                        value={state.editData.pricingCurrency || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="totalSharesOutstanding"
                        label="Total Shares Outstanding"
                        fullWidth
                        margin="dense"
                        type="number"
                        value={state.editData.totalSharesOutstanding || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="openPrice"
                        label="Open Price"
                        fullWidth
                        margin="dense"
                        type="number"
                        value={state.editData.openPrice || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="closePrice"
                        label="Close Price"
                        fullWidth
                        margin="dense"
                        type="number"
                        value={state.editData.closePrice || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="dividendDeclaredDate"
                        label="Dividend Declared Date"
                        fullWidth
                        margin="dense"
                        type="date"
                        value={state.editData.dividendDeclaredDate ? state.editData.dividendDeclaredDate.split("T")[0] : ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="pfCreditRating"
                        label="PF Credit Rating"
                        fullWidth
                        margin="dense"
                        value={state.editData.pfCreditRating || ""}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default Equity2;
