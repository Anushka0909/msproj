import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateOrder from './components/CreateOrder';
import OpenOrders from './components/OpenOrders';
import DelivererDashboard from './components/DelivererDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/orders" element={<OpenOrders />} />
            <Route path="/runner" element={<DelivererDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
