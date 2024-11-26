import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line, Radar, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  // Profitability Analysis
  const profitData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Profit Margin (%)",
        data: [20, 25, 30, 28, 35, 40],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  // Risk Analysis
  const riskData = {
    labels: ["Budget", "Timeline", "Resources", "Quality"],
    datasets: [
      {
        label: "Risk Score",
        data: [3, 4, 2, 5],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Budget Analysis
  const budgetData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Allocated Budget",
        data: [10000, 15000, 12000, 20000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Spent Budget",
        data: [8000, 14000, 10000, 18000],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Reports & Insights</h1>

      {/* Profitability Analysis */}
      <div className="my-5">
        <h3 className="text-center">Profitability Analysis</h3>
        <Line data={profitData} />
      </div>

      <div className="my-5">
        <h3 className="text-center">Risk Analysis</h3>
        <Radar data={riskData} />
      </div>

      <div className="my-5">
        <h3 className="text-center">Budget Analysis</h3>
        <Bar data={budgetData} />
      </div>
    </div>
  );
}

export default Reports;
