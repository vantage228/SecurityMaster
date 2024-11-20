import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TickerChart = ({ ticker }) => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null); 
  

  useEffect(() => {
    if (!ticker) {
      setError("Ticker is required.");
      return;
    }

    setError(null);

    axios
      .get(`https://localhost:7028/api/View/${ticker}`)
      .then((response) => {
        console.log(response)
        const data = response.data;
        setChartData({
          labels: data.map((item) => {
            const date = new Date(item.date);
            return date.toLocaleDateString(); 
          }),
          datasets: [
            {
              label: "Open Price",
              data: data.map((item) => item.open),
              borderColor: "blue",
              fill: false,
            },
            {
              label: "Close Price",
              data: data.map((item) => item.close),
              borderColor: "green",
              fill: false,
            },
          ],
        });
      })
      .catch((error) => {
        setError("Error fetching data: " + error.message);
        console.error("Error fetching data:", error);
      });
  }, [ticker]);

  if (error) {
    return <p>{error}</p>; 
  }

  return chartData ? <Line data={chartData} /> : <p>Loading...</p>;
};

export default TickerChart;
