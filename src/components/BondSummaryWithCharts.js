import React from "react";
import { Button, Box, Typography, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import "react-calendar/dist/Calendar.css";
import CustomCalendar from "./CustomCalendar";

const BondSummaryWithCharts = ({ bondData, onClose, open }) => {
    if (!bondData || bondData.length === 0) {
        return <Typography variant="h6">No bond data available.</Typography>;
    }

    // Calculate Spread
    const bondSpreads = bondData.map((bond) => ({
        securityName: bond.securityName,
        spread: bond.askPrice - bond.bidPrice,
    }));

    const top4Spreads = bondSpreads
        .sort((a, b) => b.spread - a.spread) // Sort by spread in descending order
        .slice(0, 4);

    // Callable vs Non-Callable Data
    const callableData = [
        { name: "Callable", value: bondData.filter((bond) => bond.isCallable).length },
        { name: "Non-Callable", value: bondData.filter((bond) => !bond.isCallable).length },
    ];

    // Maturity Dates
    const maturityDates = bondData.map((bond) => ({
        date: new Date(bond.maturityDate),
        name: bond.securityName
    }))


    const creditRatingCounts = bondData.reduce((acc, bond) => {
        acc[bond.formPFCreditRating] = (acc[bond.formPFCreditRating] || 0) + 1;
        return acc;
    }, {});

    const creditRatingData = Object.entries(creditRatingCounts).map(([rating, count]) => ({
        name: rating,
        value: count,
    }));
    // Colors for Pie Chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6699', '#33CC99'];

    return (
        <Dialog open={open} fullWidth sx={{ '& .MuiDialog-paper': { minWidth: '80vw', maxWidth: '80vw' } }} >
            <DialogTitle>
                <Typography variant="h4" color="white" gutterBottom align="center">
                    Bond Dashboard
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ minWidth: "70vw" }}>
                <Box sx={{ padding: 4, background: "linear-gradient(135deg, #1e3c72, #2a5298)", minHeight: "100vh", color: "white" }}>

                    <Grid container spacing={2}>
                        {/* Callable vs Non-Callable */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ background: "rgba(255, 255, 255, 0.1)", borderRadius: "10px" }}>
                                <CardContent>
                                    <Typography variant="h6" color="white" align="center">
                                        Callable vs Non-Callable
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={350}>
                                        <PieChart>
                                            <Pie
                                                data={callableData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, value }) => `${name}: ${value}`}
                                            >
                                                {callableData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Credit Rating PIECHART */}
                        <Grid item xs={12} md={6} >
                            <Card sx={{ background: "rgba(255, 255, 255, 0.1)", borderRadius: "10px" }}>
                                <CardContent>
                                    <Typography variant="h6" color="white" align="center">PF Credit Rating Distribution</Typography>
                                    <ResponsiveContainer width="100%" height={350}>
                                        <PieChart>
                                            <Pie
                                                data={creditRatingData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, value }) => `${name}: ${value}`}
                                            >
                                                {creditRatingData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginTop={5}>
                        {/* Maturity Dates */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Card height={350} sx={{ background: "rgba(255, 255, 255, 0.1)", borderRadius: "10px" }}>
                                    <CardContent>
                                        <Typography color="white" variant="h6" align="center">
                                            Maturity Dates
                                        </Typography>
                                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                            <CustomCalendar maturityDates={maturityDates} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>

                        {/* Spread Graph */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Card height={350} sx={{ background: "rgba(255, 255, 255, 0.1)", borderRadius: "10px" }}>
                                    <CardContent>
                                        <Typography color="white" variant="h6" align="center">
                                            Bid-Ask Spread
                                        </Typography>
                                        <ResponsiveContainer width="100%" height={350}>
                                            <BarChart data={top4Spreads}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="securityName" tick={{ fill: "white" }} />
                                                <YAxis tick={{ fill: "white" }} />
                                                <Tooltip />
                                                <Bar dataKey="spread" fill="#82ca9d" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                        {/* Top 4 Bonds by PF Credit Rating */}

                    </Grid>
                </Box>
                <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                    <Button variant='contained' color='error' onClick={onClose}>Close</Button>
                </Box>
            </DialogContent>
        </ Dialog>
    );
};

export default BondSummaryWithCharts;
