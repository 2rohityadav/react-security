import React, { lazy, Suspense, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet
} from 'react-router-dom';
import './App.css';

import {
  AuthProvider,
  AuthContext
} from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';

import AppShell from './AppShell';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FourOFour from './pages/FourOFour';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Account = lazy(() => import('./pages/Account'));
const Settings = lazy(() => import('./pages/Settings'));
const Users = lazy(() => import('./pages/Users'));

const LoadingFallback = () => (
  <AppShell>
    <div className="p-4">Loading...</div>
  </AppShell>
);

const AuthenticatedRoute = () => {
  const auth = useContext(AuthContext);
  return auth.isAuthenticated() ? <AppShell><Outlet /></AppShell> : <Navigate to='/' />
};

const AdminRoute = () => {
  const auth = useContext(AuthContext);
  return auth.isAuthenticated() && auth.isAdmin() ? <AppShell><Outlet /></AppShell> : <Navigate to='/' />
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<AuthenticatedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/account' element={<Account />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/users' element={<Users />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/inventory' element={<Inventory />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
