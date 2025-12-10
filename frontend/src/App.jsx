import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateOrder from './components/CreateOrder';
import OpenOrders from './components/OpenOrders';
import DelivererDashboard from './components/DelivererDashboard';
import Login from './components/Login';
import Register from './components/Register';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) {
    // Redirect to their allowed dashboard if wrong role
    return <Navigate to={user.role === 'RUNNER' ? '/runner' : '/orders'} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* USER ROUTES */}
            <Route path="/create-order" element={
              <ProtectedRoute allowedRole="USER">
                <CreateOrder />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute allowedRole="USER">
                <OpenOrders myOrders={true} />
              </ProtectedRoute>
            } />

            {/* RUNNER ROUTES */}
            <Route path="/runner" element={
              <ProtectedRoute allowedRole="RUNNER">
                <DelivererDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
