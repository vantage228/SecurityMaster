import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box } from "@mui/material";
import "../assets/CustomCalendar.css"; // Custom CSS for styling

const CustomCalendar = ({ maturityDates }) => {
  // Map maturityDates to include date and securityName
  const formattedMaturityDates = maturityDates.map(({ date, name }) => ({
    date: new Date(date),
    name,
  }));

  return (
    <Box sx={{ padding: 2, backgroundColor: "black", borderRadius: 2 }}>
      <Calendar
        tileContent={({ date }) => {
          const match = formattedMaturityDates.find(
            (maturityDate) => date.toDateString() === maturityDate.date.toDateString()
          );
          return (
            match && (
                <>
                <div style={{fontSize:""}}>{match.name}</div>
                <div className="hover-container">
                    <span className="date-highlight"></span>
                </div>
                </>
            )
          );
        }}
        tileClassName={({ date }) =>
          formattedMaturityDates.some(
            (maturityDate) => date.toDateString() === maturityDate.date.toDateString()
          )
            ? "highlight"
            : null
        }
        className="custom-calendar"
      />
      {}
    </Box>
  );
};

export default CustomCalendar;
