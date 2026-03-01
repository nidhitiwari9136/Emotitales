import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SummaryPage from "./pages/SummaryPage";
import StoryPage from "./pages/StoryPage";
import Auth from "./pages/Auth";
import LibraryPage from "./pages/LibraryPage";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

// --- YE COMPONENT NAVBAR KO HIDE KAREGA ---
const NavbarWrapper = () => {
  const location = useLocation();
  // Agar path '/login' hai toh kuch return mat karo
  if (location.pathname === "/login") return null;
  return <Navbar />;
};

function App() {
  return (
    <Router>
      {/* Navbar ab sirf login ke bahar dikhega */}
      <NavbarWrapper />

      <Routes>
        <Route path="/login" element={<Auth />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/summary"
          element={
            <ProtectedRoute>
              <SummaryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/story"
          element={
            <ProtectedRoute>
              <StoryPage />
            </ProtectedRoute>
          }
        />

        <Route path="/library" element={<LibraryPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;