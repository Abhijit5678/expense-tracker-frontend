import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={(
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                )}
              >
                <Route index element={<Dashboard />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3200}
              hideProgressBar
              closeButton={false}
              newestOnTop
              toastClassName="!rounded-2xl !border !border-[var(--border-subtle)] !bg-[var(--surface-elevated)] !text-[color:var(--text-primary)] !shadow-[var(--shadow-soft)]"
              bodyClassName="!p-0 !text-sm !font-semibold"
            />
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
