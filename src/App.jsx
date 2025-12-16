
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import MainPage from "./Order/MainPage";
import Menu from "./Menu";
import DishesChartWrapper from "./Order/DishesChartWrapper";
import Signup from "./Signup";
import Profile from "./Profile";
import AllUserData from "./AllUserData";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import RestaurantChatbot from "./RestaurantChatbot";
import "./App.css";



function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <Menu />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/charts"
            element={
              <ProtectedRoute>
                <DishesChartWrapper />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/allusers"
            element={
              <ProtectedRoute>
                <AllUserData />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* ✅ Toggle button */}
        <button
          className="chatbot-toggle"
          onClick={() => setShowChatbot(!showChatbot)}
        >
          💬
        </button>

        {/* ✅ Chatbot panel */}
        {showChatbot && (
  <div className="chatbot-floating">
    <RestaurantChatbot />
    {/* Move close button outside the chatbot content */}
    <button
      className="chatbot-close"
      onClick={() => setShowChatbot(false)}
    >
      ✖
    </button>
  </div>
)}

      </Router>
    </AuthProvider>
  );
}

export default App;
