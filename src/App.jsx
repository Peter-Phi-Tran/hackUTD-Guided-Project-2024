import Navbar from "./components/Navbar";
import FeaturedItem from "./components/FeaturedItem";
import Dashboard from "./components/Dashboard";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import ActivityPage from "./pages/ActivityPage";
import RsvpPage from "./pages/RsvpPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import { AuthProvider } from "./contexts/authContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Page at Root Path */}
          <Route path="/" element={<LandingPage />} />
          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <FeaturedItem />
                  <Dashboard />
                </>
              </PrivateRoute>
            }
          />
          {/* Browse route displaying Navbar and BrowsePage */}
          <Route
            path="/map"
            element={
              <PrivateRoute>
	              <Navbar />
                <MapPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/activity"
            element={
              <PrivateRoute>
	              <Navbar />
                <ActivityPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/rsvp"
            element={
              <PrivateRoute>
	              <Navbar />
                <RsvpPage />
              </PrivateRoute>
            }
          />
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;