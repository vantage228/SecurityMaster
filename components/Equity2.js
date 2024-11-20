import React, { useState, useEffect, useReducer } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { initialState, equityReducer, fetchEquities, editEquity, deleteEquity, setActive, openModal, closeModal, updateEditData } from './EquitySlice';
import TileComponent from './TileComponent';
import '../assets/Equity2.css';
import SecurityDetails from './SecurityDetails';
import EquitySummaryWithCharts from './EquitySummaryWithCharts';

const Equity2 = ({ tabValue }) => {
    const [displayAllDetailDialog, setDisplayAllDetailDialog] = useState(false);
    const [displaySecurityID, setDisplaySecurityID] = useState('');
    const [state, dispatch] = useReducer(equityReducer, initialState);

    // Filter states
    const [filterName, setFilterName] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [filterCreditRating, setFilterCreditRating] = useState('');

    //EquitySummaryDashboard
    const [openSummary, setOpenSummary] = useState(false)

    //Pricing Currency Mapping
    const [currencies, setCurrencies] = useState([])
    const getCurrencySymbol = (currencyCode) => {
        const currency = currencies.find((c) => c.code === currencyCode);
        return currency ? currency.symbol : '';
    };

    //Validation of TextBox
    const [errorMessages, setErrorMessages] = useState({
        totalSharesOutstanding: '',
        openPrice: '',
        closePrice: '',
        dividendDeclaredDate: ''
    });



    const handleReset = () => {
        setFilterName('')
        setFilterStartDate('')
        setFilterEndDate('')
        setFilterCreditRating('')
    }

    const handleSummaryOpen = () => {
        setOpenSummary(true)
    }

    const handleSummaryClose = () => {
        setOpenSummary(false)
    }

    useEffect(() => {
        fetchEquities(dispatch);
        fetch('/currencies.json')
            .then((response) => response.json())
            .then((data) => setCurrencies(data))
            .catch((error) => console.error("Error fetching currencies:", error));
    }, []);

    const handleEditClick = (rowData) => {
        openModal(dispatch, rowData);
    };

    const handleModalClose = () => {
        closeModal(dispatch);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Validate the number fields to ensure no more than 9 digits
        if (name === "totalSharesOutstanding" || name === "openPrice" || name === "closePrice") {
            if (value.length > 9) {
                setErrorMessages((prev) => ({
                    ...prev,
                    [name]: "INPUT SHOULD BE LESS THAN 999999999"
                }));
            } else {
                setErrorMessages((prev) => ({
                    ...prev,
                    [name]: ""
                }));
            }
        }
        updateEditData(dispatch, name, value);
    };
    const isFormInvalid = Object.values(errorMessages).some((msg) => msg !== '');

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

    const getDetail = (id) => {
        setDisplayAllDetailDialog(true);
        setDisplaySecurityID(id);
    };

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

    const activeEquityCount = state.equityData.filter((security) => security.isActive === true).length;
    const inactiveEquityCount = state.equityData.filter((security) => security.isActive === false).length;

    // Filtering logic
    const filteredEquities = state.equityData
        .filter((equity) => {
            // Filter by name
            if (filterName && !equity.securityName.toLowerCase().includes(filterName.toLowerCase())) return false;

            // Filter by date range
            if (filterStartDate || filterEndDate) {
                const equityDate = new Date(equity.dividendDeclaredDate);
                if (filterStartDate && equityDate < new Date(filterStartDate)) return false;
                if (filterEndDate && equityDate > new Date(filterEndDate)) return false;
            }

            // Filter by credit rating
            if (filterCreditRating && equity.formPFCreditRating !== filterCreditRating) return false;

            return true;
        })
        .filter((security) => security.isActive === state.active);

    return (
        <div>
            {state.isLoading ? (
                <Box sx={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress size="5rem" />
                </Box>
            ) : (
                <>
                    <TileComponent handleActive={handleActive} handleInactive={handleInactive} activeCount={activeEquityCount} inactiveCount={inactiveEquityCount} tabValue={tabValue} />

                    {/* Filters */}
                    <Box sx={{ display: 'flex', justifyContent: "center", gap: 2, marginBottom: 2, marginTop: 4 }}>
                        <TextField
                            sx={{ width: "30vw" }}
                            name="filterName"
                            label="Filter by Security Name"
                            variant="outlined"
                            fullWidth
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                        />
                        <TextField
                            name="filterStartDate"
                            label="Start Date"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={filterStartDate}
                            onChange={(e) => setFilterStartDate(e.target.value)}
                        />
                        <TextField
                            name="filterEndDate"
                            label="End Date"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={filterEndDate}
                            onChange={(e) => setFilterEndDate(e.target.value)}
                        />
                        <FormControl>
                            <InputLabel id="filterCreditRating-label">Filter by Credit Rating</InputLabel>
                            <Select
                                sx={{ width: "20vw" }}
                                labelId="filterCreditRating-label"
                                name="filterCreditRating"
                                value={filterCreditRating}
                                onChange={(e) => setFilterCreditRating(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                {investmentGradeRatings.map((rating) => (
                                    <MenuItem key={rating.value} value={rating.value}>
                                        {rating.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button variant='contained' color='warning' onClick={handleReset}>Reset Filters</Button>
                        <Button variant='contained' color='warning' onClick={handleSummaryOpen}>Summary</Button>
                    </Box>

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
                            <TableBody>
                                {filteredEquities.map((row) => (
                                    <TableRow key={row.securityID}>
                                        <TableCell>
                                            <Button onClick={() => getDetail(row.securityID)}>{row.securityID}</Button>
                                        </TableCell>
                                        <TableCell>{row.securityName}</TableCell>
                                        <TableCell>{row.securityDescription}</TableCell>
                                        <TableCell>{row.isActive ? "true" : "false"}</TableCell>
                                        <TableCell>{row.pricingCurrency}</TableCell>
                                        <TableCell>{row.totalSharesOutstanding}</TableCell>
                                        <TableCell>
                                            {`${getCurrencySymbol(row.pricingCurrency)}${row.openPrice}`}
                                        </TableCell>
                                        <TableCell>
                                            {`${getCurrencySymbol(row.pricingCurrency)}${row.closePrice}`}
                                        </TableCell>
                                        <TableCell>{new Date(row.dividendDeclaredDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{row.formPFCreditRating}</TableCell>
                                        <TableCell>
                                            <span style={{ color: row.ytdReturn >= 0 ? "#d4f6d4" : "red" }}>
                                                {row.ytdReturn}
                                            </span>
                                        </TableCell>
                                        <TableCell sx={{ display: "flex" }}>
                                            <Button sx={{ margin: "2px" }} disabled={!row.isActive}
                                                variant="contained" color="primary" onClick={() => handleEditClick(row)}>Edit</Button>
                                            <Button disabled={!row.isActive}
                                                sx={{ margin: "2px", backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "darkred" } }} variant="contained" onClick={() => handleDeleteClick(row.securityID)}>Deactivate</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}

            {/* Security Details */}
            <SecurityDetails securityID={displaySecurityID} open={displayAllDetailDialog} setOpen={setDisplayAllDetailDialog} />

            <EquitySummaryWithCharts open={openSummary} onClose={handleSummaryClose} equityData={state.equityData} />


            {/* Edit Dialog */}
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
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="pricingCurrency-label">Pricing Currency</InputLabel>
                        <Select
                            labelId="pricingCurrency-label"
                            name="pricingCurrency"
                            value={state.editData.pricingCurrency || ""}
                            onChange={handleInputChange}
                        >
                            {currencies.map((currency) => (
                                <MenuItem key={currency.code} value={currency.code}>
                                    {currency.name} ({currency.code})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        name="totalSharesOutstanding"
                        label="Total Shares Outstanding"
                        value={state.editData.totalSharesOutstanding}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errorMessages.totalSharesOutstanding}
                        helperText={errorMessages.totalSharesOutstanding}

                    />

                    <TextField
                        name="openPrice"
                        label="Open Price"
                        value={state.editData.openPrice}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errorMessages.openPrice}
                        helperText={errorMessages.openPrice}
                    />

                    <TextField
                        name="closePrice"
                        label="Close Price"
                        value={state.editData.closePrice}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errorMessages.closePrice}
                        helperText={errorMessages.closePrice}
                    />

                    <TextField
                        name="dividendDeclaredDate"
                        label="Dividend Declared Date"
                        fullWidth
                        margin="dense"
                        type="date"
                        style={{
                            border: state.editData.dividendDeclaredDate ? undefined : "2px solid red"
                        }}
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={isFormInvalid}
                    > Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Equity2;
