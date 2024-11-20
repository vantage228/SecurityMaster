import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import '../assets/Line.css'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineGraphDialog = ({ open, onClose, data }) => {
  const chartData = {
    labels: data.map((item) => item.asOfDate),
    datasets: [
      {
        label: "Open",
        data: data.map((item) => item.open),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
        tension: 0.4,
      },
      {
        label: "Close",
        data: data.map((item) => item.close),
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.3)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Date" },
      },
      y: {
        title: { display: true, text: "Value" },
      },
    },
  };

  return (
    <div className={`dialog ${open ? "open" : ""}`}>
      <div className="dialog-content">
        <div className="dialog-header">
          <h2>Open vs Close Values</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="dialog-body">
          <Line data={chartData} options={options} />
        </div>
        <div className="dialog-footer">
          <button onClick={onClose} className="action-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LineGraphDialog;
