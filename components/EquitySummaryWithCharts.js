import React from 'react';
import {Box, Button, Typography, Grid, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const EquitySummaryWithCharts = ({ equityData, onClose, open }) => {
    if (!equityData || equityData.length === 0) {
        return <Typography variant="h6">No equity data available.</Typography>;
    }

    // Prepare Data for Charts
    const highPerformingEquities = equityData
        .filter(equity => equity.ytdReturn > 0)
        .sort((a, b) => b.ytdReturn - a.ytdReturn)
        .slice(0, 4);

    const highPerformingEquities2 = equityData
        .filter(equity => equity.totalSharesOutstanding > 0)
        .sort((a, b) => b.totalSharesOutstanding - a.totalSharesOutstanding)
        .slice(0, 4);

    const creditRatingCounts = equityData.reduce((acc, equity) => {
        acc[equity.formPFCreditRating] = (acc[equity.formPFCreditRating] || 0) + 1;
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
                <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
                    Equity Performance Summary
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ minWidth: "70vw" }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" align="center">PF Credit Rating Distribution</Typography>
                        <ResponsiveContainer width="100%" height={300} style={{ background: "linear-gradient(45deg, #1d3557, transparent)" }}>
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
                    </Grid>

                    {/* Bar Chart: Top 4 Total Shares Outstanding */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" align="center">Top 4 Equities (Total Shares Outstanding)</Typography>
                        <ResponsiveContainer width="100%" height={300} style={{ background: "linear-gradient(45deg, #1d3557, transparent)" }}>
                            <BarChart
                                data={highPerformingEquities2.map(equity => ({
                                    name: equity.securityName,
                                    totalSharesOutstanding: equity.totalSharesOutstanding,
                                }))}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fill: 'white' }} />
                                <YAxis tick={{ fill: 'white' }}
                                    tickFormatter={(value) => {
                                        if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`; // Billions
                                        if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`; // Millions
                                        if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`; // Thousands
                                        return value;
                                    }} />
                                <Tooltip />
                                <Bar dataKey="totalSharesOutstanding" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>

                    {/* Bar Chart: Top 4 YTD Returns */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" align="center">Top 4 Equities (YTD Returns)</Typography>
                        <ResponsiveContainer width="100%" height={300} style={{ background: "linear-gradient(45deg, #1d3557, transparent)" }}>
                            <BarChart
                                data={highPerformingEquities.map(equity => ({
                                    name: equity.securityName,
                                    ytdReturn: equity.ytdReturn,
                                }))}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fill: 'white' }} />
                                <YAxis tick={{ fill: 'white' }} />
                                <Tooltip />
                                <Bar dataKey="ytdReturn" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
                <Box sx={{textAlign:"center", marginTop:"20px"}}>
                    <Button variant='contained' color='error' onClick={onClose}>Close</Button>
                </Box>
            </DialogContent>
        </Dialog >
    );
};

export default EquitySummaryWithCharts;
