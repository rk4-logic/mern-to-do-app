import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks || []); // match backend key
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create / Update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, { title, description });
        setEditingTask(null);
      } else {
        await api.post("/tasks", { title, description });
      }
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  // Toggle task status
  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      await api.put(`/tasks/${task._id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "0 15px" }}>
      <h2 style={{ textAlign: "center" }}>My Tasks</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tasks available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <h4 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{task.title}</span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "4px",
                    backgroundColor: task.status === "completed" ? "green" : "orange",
                    color: "#fff",
                    fontSize: "0.8rem",
                  }}
                >
                  {task.status || "pending"}
                </span>
              </h4>
              <p>{task.description}</p>
              <div>
                <button
                  onClick={() => handleEdit(task)}
                  style={{ marginRight: "10px", padding: "4px 8px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  style={{ marginRight: "10px", padding: "4px 8px" }}
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleStatus(task)}
                  style={{ padding: "4px 8px" }}
                >
                  {task.status === "completed" ? "Mark Pending" : "Mark Completed"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
