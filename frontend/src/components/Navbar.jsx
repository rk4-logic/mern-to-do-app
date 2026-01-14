import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthCOntext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#007bff",
        color: "#fff",
        margin: 0,
      }}
    >
      <h3>Todo App</h3>
      <div>
        {user ? (
          <>
            <Link to="/tasks" style={{ marginRight: "15px", color: "#fff", textDecoration: "none" }}>
              Tasks
            </Link>
            <button
              onClick={logout}
              style={{
                padding: "5px 10px",
                background: "#fff",
                color: "#007bff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "15px", color: "#fff", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
