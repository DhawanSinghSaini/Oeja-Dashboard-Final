import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import FinanceDashboard from "./pages/FinanceDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import EngagementDashboard from "./pages/EngagementDashboard";
import Login from "./pages/Login";
import RequestReview from "./pages/RequestReview";
import AdminAccess from "./pages/AdminAccess";

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex h-screen bg-primary">
      {!isLoginPage && <Sidebar />}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<FinanceDashboard />} />
          <Route path="/finance" element={<FinanceDashboard />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/engagement" element={<EngagementDashboard />} />
          <Route path="/onboarding" element={<RequestReview />} />
          <Route path="/privileges" element={<AdminAccess />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
