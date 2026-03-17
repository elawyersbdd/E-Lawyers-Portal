import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout';
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { EmailVerification } from './pages/auth/EmailVerification';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Home } from './pages/dashboard/Home';
import Resources from './pages/dashboard/Resources';
import Academy from './pages/dashboard/Academy';
import LegalServices from './pages/dashboard/LegalServices';
import Appointment from './pages/dashboard/Appointment';
import { MyNotes } from './pages/dashboard/MyNotes';
import { CreateNote } from './pages/dashboard/CreateNote';
import { SingleNote } from './pages/dashboard/SingleNote';
import { Account } from './pages/dashboard/Account';
import VatTaxCalculator from './pages/dashboard/VatTaxCalculator';
import PayrollTaxCalculator from './pages/dashboard/payroll/PayrollTaxCalculator';
import { RoutePath } from './types';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path={RoutePath.LOGIN} element={<SignIn />} />
          <Route path={RoutePath.SIGNUP} element={<SignUp />} />
          <Route path={RoutePath.VERIFY_EMAIL} element={<EmailVerification />} />
          <Route path={RoutePath.FORGOT_PASSWORD} element={<ForgotPassword />} />

          {/* Dashboard Layout (Shared by Guest and Auth users) */}
          <Route element={<DashboardLayout />}>
            {/* Public Home Page (Handles both Guest and Auth states internally) */}
            <Route path={RoutePath.HOME} element={<Home />} />
            <Route path={RoutePath.RESOURCES} element={<ProtectedRoute><Resources /></ProtectedRoute>} />
            <Route path={RoutePath.ACADEMY} element={<ProtectedRoute><Academy /></ProtectedRoute>} />
            <Route path={RoutePath.LEGAL_SERVICES} element={<LegalServices />} />
            <Route path={RoutePath.APPOINTMENT} element={<Appointment />} />
            <Route path={RoutePath.CALCULATOR} element={<ProtectedRoute><VatTaxCalculator /></ProtectedRoute>} />
            <Route path={RoutePath.PAYROLL_CALCULATOR} element={<ProtectedRoute><PayrollTaxCalculator /></ProtectedRoute>} />
            
            {/* Protected Routes - Redirect to Login if Guest */}
            <Route path={RoutePath.NOTES} element={<ProtectedRoute><MyNotes /></ProtectedRoute>} />
            <Route path={RoutePath.CREATE_NOTE} element={<ProtectedRoute><CreateNote /></ProtectedRoute>} />
            <Route path={RoutePath.EDIT_NOTE} element={<ProtectedRoute><CreateNote /></ProtectedRoute>} />
            <Route path={RoutePath.NOTE_DETAIL} element={<ProtectedRoute><SingleNote /></ProtectedRoute>} />
            <Route path={RoutePath.ACCOUNT} element={<ProtectedRoute><Account /></ProtectedRoute>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to={RoutePath.HOME} replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;