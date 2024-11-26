import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar, Card } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Dashboard() {
  // Simulated data
  const progressData = [
    { project: "Website Redesign", progress: 80, status: "On Track" },
    { project: "App Development", progress: 60, status: "At Risk" },
    { project: "Database Migration", progress: 50, status: "Delayed" },
  ];

  const teamEfficiency = {
    labels: ["Alice", "Bob", "Charlie", "Diana"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [15, 18, 12, 20],
        backgroundColor: "#007bff",
      },
    ],
  };

  const expenseData = {
    labels: ["Allocated Budget", "Spent Budget", "Savings"],
    datasets: [
      {
        label: "Budget Overview",
        data: [60000, 45000, 15000],
        backgroundColor: ["#007bff", "#ffc107", "#28a745"],
      },
    ],
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5 fw-bold">Dashboard</h1>

      {/* Key Metrics Section */}
      <div className="row mb-5">
        {[
          {
            title: "Projects at Risk",
            value: "3",
            color: "danger",
            description: "Projects requiring immediate attention.",
          },
          {
            title: "Team Efficiency",
            value: "85%",
            color: "primary",
            description: "Team productivity last week.",
          },
          {
            title: "Budget at Risk",
            value: "$15,000",
            color: "warning",
            description: "Potential overspending this quarter.",
          },
        ].map((metric, idx) => (
          <div className="col-md-4" key={idx}>
            <Card className={`border-0 shadow-sm rounded mb-4 text-center`}>
              <Card.Body>
                <h6 className={`text-${metric.color} fw-semibold`}>{metric.title}</h6>
                <h2 className="fw-bold text-dark">{metric.value}</h2>
                <p className="text-muted small">{metric.description}</p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row mb-5">
        <div className="col-md-6">
          <Card className="shadow-sm border-0 rounded">
            <Card.Body>
              <h6 className="fw-semibold">Team Efficiency</h6>
              <Bar data={teamEfficiency} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="shadow-sm border-0 rounded">
            <Card.Body>
              <h6 className="fw-semibold">Budget Overview</h6>
              <Pie data={expenseData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Progress Tracking */}
      <div>
        <h6 className="fw-semibold mb-4">Project Progress</h6>
        {progressData.map((item, index) => (
          <Card className="mb-3 shadow-sm border-0 rounded" key={index}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-semibold">{item.project}</span>
                <span
                  className={`badge bg-${
                    item.status === "On Track" ? "success" : item.status === "At Risk" ? "warning" : "danger"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <ProgressBar
                now={item.progress}
                className="mt-2"
                variant={item.status === "On Track" ? "success" : item.status === "At Risk" ? "warning" : "danger"}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
