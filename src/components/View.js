import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import LineGraphDialog from './LineGraphDialog'
import Navbar from "./Navbar";

const View = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const pageSize = 100;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:7028/api/View", {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          asOfDate: selectedDate || undefined,
        },
      });

      const result = response.data;
      setData(result.data || []);
      setFilteredData(result.data || []);
      setTotalPages(result.totalPages || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if(!isAuthenticated)
      window.location.href = "/auth";

    fetchData();
    // eslint-disable-next-line
  }, [pageNumber, selectedDate]);

  useEffect(() => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.ticker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.security?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortColumn) {
      filtered = filtered.sort((a, b) => {
        const valA = a[sortColumn] || "";
        const valB = b[sortColumn] || "";

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(filtered);
  }, [searchQuery, data, sortColumn, sortDirection]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setPageNumber(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const renderSortArrow = (column) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? "↑" : "↓";
    }
    return null;
  };

  const exportToCSV = () => {
    const headers = [
      "AsOfDate",
      "Ticker",
      "Security",
      "GICS Sector",
      "GICS Sub Industry",
      "Headquarters Location",
      "Founded",
      "Open",
      "Close",
      "DTD Change %",
      "MTD Change %",
      "QTD Change %",
      "YTD Change %",
    ];

    const csvRows = [
      headers.join(","),
      ...filteredData.map((item) =>
        [
          item.asOfDate || "",
          item.ticker || "",
          item.security || "",
          item.gicS_Sector || "",
          item.gicS_Sub_Industry || "",
          item.headquarters_Location || "",
          item.founded || "",
          item.open || "",
          item.close || "",
          item.dtD_Change_Percent || "0",
          item.mtD_Change_Percent || "0",
          item.qtD_Change_Percent || "0",
          item.ytD_Change_Percent || "0",
        ].join(",")
      ),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
    <Navbar />
    <Box p={3}>
      <h2>View Data</h2>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <TextField
          label="Select Date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Search"
          placeholder="Enter Ticker or Security"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button variant="contained" color="primary" onClick={exportToCSV}>
          Export to CSV
        </Button>

        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Show Line Graph
      </Button>
      <LineGraphDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        data={data}
      />
      </Box>

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  { label: "AsOfDate", field: "asOfDate" },
                  { label: "Ticker", field: "ticker" },
                  { label: "Security", field: "security" },
                  { label: "GICS Sector", field: "gicS_Sector" },
                  { label: "GICS Sub Industry", field: "gicS_Sub_Industry" },
                  { label: "Headquarters Location", field: "headquarters_Location" },
                  { label: "Founded", field: "founded" },
                  { label: "Open", field: "open" },
                  { label: "Close", field: "close" },
                  { label: "DTD Change %", field: "dtD_Change_Percent" },
                  { label: "MTD Change %", field: "mtD_Change_Percent" },
                  { label: "QTD Change %", field: "qtD_Change_Percent" },
                  { label: "YTD Change %", field: "ytD_Change_Percent" },
                ].map((column) => (
                  <TableCell
                    key={column.field}
                    onClick={() => handleSort(column.field)}
                    sx={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    {column.label} {renderSortArrow(column.field)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.asOfDate || "N/A"}</TableCell>
                    <TableCell>{item.ticker || "N/A"}</TableCell>
                    <TableCell>{item.security || "N/A"}</TableCell>
                    <TableCell>{item.gicS_Sector || "N/A"}</TableCell>
                    <TableCell>{item.gicS_Sub_Industry || "N/A"}</TableCell>
                    <TableCell>{item.headquarters_Location || "N/A"}</TableCell>
                    <TableCell>{item.founded || "N/A"}</TableCell>
                    <TableCell>{item.open || "N/A"}</TableCell>
                    <TableCell>{item.close || "N/A"}</TableCell>
                    <TableCell>{item.dtD_Change_Percent || "0"}</TableCell>
                    <TableCell>{item.mtD_Change_Percent || "0"}</TableCell>
                    <TableCell>{item.qtD_Change_Percent || "0"}</TableCell>
                    <TableCell>{item.ytD_Change_Percent || "0"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={13} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <Button
          variant="contained"
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Box mx={2}>
          Page {pageNumber} of {totalPages}
        </Box>
        <Button
          variant="contained"
          disabled={pageNumber >= totalPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default View;
