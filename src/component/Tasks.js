import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TaskManagement() {
  // Domains
  const [domains, setDomains] = useState([
    { id: 1, name: "Software Development" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "Operations" },
  ]);

  // Projects associated with domains
  const [projects, setProjects] = useState([
    { id: 1, domainId: 1, name: "Website Development" },
    { id: 2, domainId: 1, name: "Mobile App" },
    { id: 3, domainId: 2, name: "Ad Campaign" },
    { id: 4, domainId: 3, name: "Logistics Optimization" },
  ]);

  // Tasks associated with projects
  const [tasks, setTasks] = useState([
    { id: 1, projectId: 1, name: "Design UI", priority: "High", status: "In Progress", assignedTo: "John Doe", dependencies: [] },
    { id: 2, projectId: 2, name: "Backend Setup", priority: "Medium", status: "Pending", assignedTo: "Jane Smith", dependencies: [] },
    { id: 3, projectId: 3, name: "Social Media Ads", priority: "High", status: "In Progress", assignedTo: "Mark Lee", dependencies: [] },
    { id: 4, projectId: 4, name: "Inventory Analysis", priority: "Low", status: "Completed", assignedTo: "Anna White", dependencies: [] },
  ]);

  // Team members
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe", role: "UI Designer", workload: 2 },
    { id: 2, name: "Jane Smith", role: "Backend Developer", workload: 1 },
    { id: 3, name: "Mark Lee", role: "Marketing Specialist", workload: 3 },
    { id: 4, name: "Anna White", role: "Data Analyst", workload: 0 },
  ]);

  // State for selected domain, project, task creation, and dependency selection
  const [selectedDomainId, setSelectedDomainId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");
  const [assignedTo, setAssignedTo] = useState("");
  const [dependencies, setDependencies] = useState([]); // To store selected dependencies for the new task

  // New project data
  const [newProjectName, setNewProjectName] = useState("");

  // Select a domain
  const handleDomainClick = (domainId) => {
    setSelectedDomainId(domainId);
    setSelectedProjectId(null); // Reset project selection
  };

  // Select a project
  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
  };

  // Create a new task with dependencies
  const handleCreateTask = () => {
    if (!newTaskName) return alert("Task name cannot be empty!");
    if (!selectedProjectId) return alert("Please select a project!");

    const assignedMember = assignedTo
      ? teamMembers.find((member) => member.name === assignedTo)
      : teamMembers.reduce((prev, current) => (prev.workload < current.workload ? prev : current));

    if (!assignedMember) return alert("No available team members!");

    const newTask = {
      id: tasks.length + 1,
      projectId: selectedProjectId,
      name: newTaskName,
      priority: newTaskPriority,
      status: "Pending",
      assignedTo: assignedMember.name,
      dependencies: dependencies, // Set dependencies for the new task
    };

    setTasks([...tasks, newTask]);
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === assignedMember.id
          ? { ...member, workload: member.workload + 1 }
          : member
      )
    );

    setNewTaskName(""); // Reset input
    setAssignedTo(""); // Reset team member selection
    setDependencies([]); // Clear selected dependencies

    alert(`Task "${newTaskName}" assigned to ${assignedMember.name} with dependencies.`);
  };

  // Add a new project to the selected domain
  const handleAddProject = () => {
    if (!newProjectName || !selectedDomainId) return alert("Project name and domain are required!");
    
    const newProject = {
      id: projects.length + 1,
      domainId: selectedDomainId,
      name: newProjectName,
    };

    setProjects([...projects, newProject]);
    setNewProjectName(""); // Reset input
    alert(`Project "${newProjectName}" added to the domain.`);
  };

  // Handle task dependency selection
  const handleDependencyChange = (taskId) => {
    if (dependencies.includes(taskId)) {
      setDependencies(dependencies.filter((id) => id !== taskId)); // Remove dependency
    } else {
      setDependencies([...dependencies, taskId]); // Add dependency
    }
  };

  return (
    <div className="container my-4">
      <h2>Task Management System</h2>

      {/* Domain List */}
      <div className="row">
        <div className="col-md-3">
          <h4>Domains</h4>
          <ul className="list-group">
            {domains.map((domain) => (
              <li
                key={domain.id}
                className={`list-group-item ${selectedDomainId === domain.id ? "active" : ""}`}
                onClick={() => handleDomainClick(domain.id)}
                style={{ cursor: "pointer" }}
              >
                {domain.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Project List */}
        <div className="col-md-3">
          {selectedDomainId && (
            <>
              <h4>Projects</h4>
              <ul className="list-group">
                {projects
                  .filter((project) => project.domainId === selectedDomainId)
                  .map((project) => (
                    <li
                      key={project.id}
                      className={`list-group-item ${selectedProjectId === project.id ? "active" : ""}`}
                      onClick={() => handleProjectClick(project.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {project.name}
                    </li>
                  ))}
              </ul>
              {/* Add Project */}
              <div className="my-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="New Project Name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
                <button className="btn btn-success mt-2" onClick={handleAddProject}>
                  Add Project
                </button>
              </div>
            </>
          )}
        </div>

        {/* Task List */}
        <div className="col-md-6">
          {selectedProjectId && (
            <>
              <h4>
                Tasks for Project:{" "}
                {projects.find((p) => p.id === selectedProjectId).name}
              </h4>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Task Name</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>Dependencies</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks
                    .filter((task) => task.projectId === selectedProjectId)
                    .map((task, index) => (
                      <tr key={task.id}>
                        <td>{index + 1}</td>
                        <td>{task.name}</td>
                        <td>{task.priority}</td>
                        <td>{task.status}</td>
                        <td>{task.assignedTo}</td>
                        <td>{task.dependencies.length ? task.dependencies.join(", ") : "None"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {/* Create New Task */}
              <div className="my-3">
                <h5>Create New Task</h5>
                <div className="form-group mb-2">
                  <label>Task Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Priority</label>
                  <select
                    className="form-control"
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label>Assign To</label>
                  <select
                    className="form-control"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {teamMembers
                      .filter((member) => member.workload < 3) // Prevent over-assignment
                      .map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name} - {member.role}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label>Task Dependencies</label>
                  <div>
                    {tasks
                      .filter((task) => task.projectId === selectedProjectId)
                      .map((task) => (
                        <div key={task.id}>
                          <input
                            type="checkbox"
                            checked={dependencies.includes(task.id)}
                            onChange={() => handleDependencyChange(task.id)}
                          />
                          <label className="ml-2">{task.name}</label>
                        </div>
                      ))}
                  </div>
                </div>
                <button className="btn btn-primary" onClick={handleCreateTask}>
                  Create Task
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskManagement;
