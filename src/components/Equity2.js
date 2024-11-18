import React, { useState,  useEffect, useReducer } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { initialState, equityReducer, fetchEquities, editEquity, deleteEquity, setActive, openModal, closeModal, updateEditData } from './EquitySlice';
import TileComponent from './TileComponent';
import '../assets/Equity2.css'
import SecurityDetails from './SecurityDetails';

const Equity2 = ({ tabValue }) => {
    const [displayAllDetailDialog, setDisplayAllDetailDialog] = useState(false)
    const [displaySecurityID, setDisplaySecurityID] = useState('')

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
        console.log(state.active)
    };

    const handleInactive = () => {
        setActive(dispatch, false);
        console.log(state.active)
    };

    const getDetail = (id) => {
        setDisplayAllDetailDialog(true);
        setDisplaySecurityID(id)
    }

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
                                    <TableCell>YTD Returns</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            {(state.active) ?
                                <TableBody>
                                    {state.equityData.filter(security => security.isActive === true).map((row) => (
                                        <TableRow key={row.securityID}>
                                            <TableCell>
                                                <Button onClick={()=>getDetail(row.securityID)}>{row.securityID}</Button>
                                                </TableCell>
                                            <TableCell>{row.securityName}</TableCell>
                                            <TableCell>{row.securityDescription}</TableCell>
                                            <TableCell>{row.isActive ? "true" : "false"}</TableCell>
                                            <TableCell>{row.pricingCurrency}</TableCell>
                                            <TableCell>{row.totalSharesOutstanding}</TableCell>
                                            <TableCell>{row.openPrice}</TableCell>
                                            <TableCell>{row.closePrice}</TableCell>
                                            <TableCell>{new Date(row.dividendDeclaredDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{row.formPFCreditRating}</TableCell>
                                            <TableCell>
                                                <span style={{ color: row.ytdReturn >= 0 ? "#d4f6d4" : "red" }}>
                                                    {row.ytdReturn}
                                                </span>
                                            </TableCell>
                                            <TableCell sx={{ display: "flex" }}>
                                                <Button sx={{ margin: "2px" }} variant="contained" color="primary" onClick={() => handleEditClick(row)}>Edit</Button>
                                                <Button sx={{ margin: "2px", backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "darkred" } }} variant="contained" onClick={() => handleDeleteClick(row.securityID)}>Deactivate</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                :
                                <TableBody>
                                    {state.equityData.filter(security => security.isActive === false).map((row) => (
                                        <TableRow key={row.securityID}>
                                            <TableCell>{row.securityID}</TableCell>
                                            <TableCell>{row.securityName}</TableCell>
                                            <TableCell>{row.securityDescription}</TableCell>
                                            <TableCell>{row.isActive ? "true" : "false"}</TableCell>
                                            <TableCell>{row.pricingCurrency}</TableCell>
                                            <TableCell sx={{ color: row.totalSharesOutstanding >= 0 ? "green !important" : "white!important" }}>{row.totalSharesOutstanding}</TableCell>
                                            <TableCell>{row.openPrice}</TableCell>
                                            <TableCell>{row.closePrice}</TableCell>
                                            <TableCell>{new Date(row.dividendDeclaredDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{row.formPFCreditRating}</TableCell>
                                            <TableCell>
                                                <span style={{ color: row.ytdReturn >= 0 ? "#d4f6d4" : "red" }}>
                                                    {row.ytdReturn}
                                                </span>
                                            </TableCell>
                                            <TableCell sx={{ display: "flex" }}>
                                                <Button disabled sx={{ margin: "2px" }} variant="contained" color="primary" onClick={() => handleEditClick(row)}>Edit</Button>
                                                <Button disabled sx={{ margin: "2px", backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "darkred" } }} variant="contained" onClick={() => handleDeleteClick(row.securityID)}>Deactivate</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            }
                        </Table>
                    </TableContainer>
                </>
            )}
            
            {/* Component to show Particular Details */}
            <SecurityDetails securityID={displaySecurityID} open={displayAllDetailDialog} setOpen={setDisplayAllDetailDialog}/>

            <Dialog open={state.isModalOpen} onClose={handleModalClose}>
                <DialogTitle>Edit Equity Data</DialogTitle>
                <DialogContent>
                    <TextField
                        name="securityName"
                        label="Security Name"
                        disabled
                        fullWidth
                        margin="dense"
                        value={state.editData.securityName || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="securityDescription"
                        label="Description"
                        fullWidth
                        margin="dense"
                        value={state.editData.securityDescription || ""}
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
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="formPFCreditRating-label">PF Credit Rating</InputLabel>
                        <Select
                            labelId="formPFCreditRating-label"
                            name="formPFCreditRating"
                            value={state.editData.formPFCreditRating || ""}
                            onChange={handleInputChange}
                        >
                            {investmentGradeRatings.map((rating) => (
                                <MenuItem key={rating.value} value={rating.value}>
                                    {rating.label}
                                </MenuItem>
                            ))}
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

export default Equity2;
