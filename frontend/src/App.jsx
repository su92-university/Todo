import { useAuth } from "./context/authcontext";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewTask from "./pages/NewTask";
import HomePage from "./pages/Homepage";
import OTPVerify from "./pages/OTPVerify";

// Wrapper to protect /newtask route for logged-in and verified users
function ProtectedRoute({ children }) {
  const { isAuthenticated, isEmailVerified } = useAuth();
  if (!isAuthenticated() || !isEmailVerified()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Wrapper to protect /verifyotp route
function OTPProtectedRoute({ children }) {
  const isRegistering = localStorage.getItem("isRegistering") === "true";
  if (!isRegistering) {
    return <Navigate to="/signup" replace />;
  }
  return children;
}

function AuthRedirectRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/signup"
        element={
          <AuthRedirectRoute>
            <Signup />
          </AuthRedirectRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AuthRedirectRoute>
            <Login />
          </AuthRedirectRoute>
        }
      />

      <Route
        path="/verifyotp"
        element={
          <OTPProtectedRoute>
            <OTPVerify />
          </OTPProtectedRoute>
        }
      />

      <Route
        path="/newtask"
        element={
          <ProtectedRoute>
            <NewTask />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
