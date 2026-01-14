import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import { useAuth } from "./context/AuthCOntext";
import Navbar from "./components/Navbar";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/tasks" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/tasks" />}
        />
        <Route
          path="/tasks"
          element={user ? <Tasks /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
