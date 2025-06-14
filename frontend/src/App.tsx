import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import { AuthPage } from "./pages/Auth";
import LandingPage from "./pages/LandingPage";
import { ThemeProvider } from "./components/context/ThemeContext";
import DashboardLayout from "./pages/DashboardLayout";
import Twitter from "./components/dashboardpages/Twitter";
import Youtube from "./components/dashboardpages/Youtube";
import AskAi from "./components/dashboardpages/AskAi";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/auth"
            element={<AuthPage setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardLayout />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          >
            <Route path="" element={<Dashboard />} />
            <Route path="twitter" element={<Twitter />} />
            <Route path="youtube" element={<Youtube />} />
            <Route path="ask-ai" element={<AskAi />} />
            {/* Add more subroutes here */}
          </Route>

          {/* Redirect /home to /dashboard */}
          {/* <Route path="/home" element={<Navigate to="/dashboard" replace />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
