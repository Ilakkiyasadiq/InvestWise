import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OwnedStocks from './pages/OwnedStocks';
import PaymentStocks from './pages/PaymentStocks';
import BuyStocks from './pages/BuyStocks';
import StockCalculator from './pages/StockCalculator';
import StockDashboard from './pages/StockDashboard';
import StockMarket from './pages/StockMarket';
import Terms from './pages/Terms';
import TransactionHistory from './pages/TransactionHistory';
import Payment from './pages/Payment';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/owned-stocks" element={
                <PrivateRoute>
                  <OwnedStocks />
                </PrivateRoute>
              } />
              <Route path="/payment-stocks" element={
                <PrivateRoute>
                  <PaymentStocks />
                </PrivateRoute>
              } />
              <Route path="/buy-stocks" element={
                <PrivateRoute>
                  <BuyStocks />
                </PrivateRoute>
              } />
              <Route path="/stock-calculator" element={<StockCalculator />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <StockDashboard />
                </PrivateRoute>
              } />
              <Route path="/market" element={<StockMarket />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/history" element={
                <PrivateRoute>
                  <TransactionHistory />
                </PrivateRoute>
              } />
              <Route path="/payment" element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;