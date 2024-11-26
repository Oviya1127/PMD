import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Tasks from './component/Tasks';
import Notifications from './component/Notifications';
import Reports from './component/Reports_and_analytics';
import Kwh from './component/Kwh';

function App() {
    return (
        <Router>
            <div className="container my-4">
                {/* Navigation Bar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                    <Link className="navbar-brand" to="/">Project Manager</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tasks">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/notifications">Notifications</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/reports">Reports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/kwh">Knowledge Hub</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Routes */}
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/kwh" element={<Kwh />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
