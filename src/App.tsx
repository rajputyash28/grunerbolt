import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import FarmerManagement from './components/farmers/FarmerManagement';
import FarmerProfile from './components/farmers/FarmerProfile';
import AddFarmer from './components/farmers/AddFarmer';
import EditFarmer from './components/farmers/EditFarmer';
import KisaniDidiManagement from './components/kisani-didi/KisaniDidiManagement';
import KisaniDidiProfile from './components/kisani-didi/KisaniDidiProfile';
import TaskManagement from './components/tasks/TaskManagement';
import FarmManagerManagement from './components/farm-managers/FarmManagerManagement';
import AttendanceManagement from './components/attendance/AttendanceManagement';
import CarbonReports from './components/carbon/CarbonReports';
import BookingManagement from './components/bookings/BookingManagement';
import StaticContent from './components/static/StaticContent';
import NotificationManagement from './components/notifications/NotificationManagement';
import PaymentManagement from './components/payments/PaymentManagement';
import SubAdminManagement from './components/sub-admin/SubAdminManagement';
import Settings from './components/settings/Settings';
import AddKisaniDidi from './components/kisani-didi/AddKisaniDidi';
import EditKisaniDidi from './components/kisani-didi/EditKisaniDidi';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Layout onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/farmers" element={<FarmerManagement />} />
              <Route path="/farmers/add" element={<AddFarmer />} />
              <Route path="/farmers/edit/:id" element={<EditFarmer />} />
              <Route path="/farmers/:id" element={<FarmerProfile />} />
              <Route path="/kisani-didi" element={<KisaniDidiManagement />} />
              <Route path="/kisani-didi/:id" element={<KisaniDidiProfile />} />
              <Route path="/kisani-didi/add" element={<AddKisaniDidi />} />
              <Route path="/kisani-didi/edit/:id" element={<EditKisaniDidi />} />
              <Route path="/farm-managers" element={<FarmManagerManagement />} />
              <Route path="/tasks" element={<TaskManagement />} />
              <Route path="/attendance" element={<AttendanceManagement />} />
              <Route path="/carbon-reports" element={<CarbonReports />} />
              <Route path="/bookings" element={<BookingManagement />} />
              <Route path="/static-content" element={<StaticContent />} />
              <Route path="/notifications" element={<NotificationManagement />} />
              <Route path="/payments" element={<PaymentManagement />} />
              <Route path="/sub-admins" element={<SubAdminManagement />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        )}
      </div>
    </Router>
  );
}

export default App;