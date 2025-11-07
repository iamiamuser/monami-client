import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './styles/global.css';

import PrivateRoute from './components/PrivateRoute'; 
import NavigationBar from './components/NavigationBar'; 
import DashboardPage from './dashboard/DashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import SalesPrediction from './dashboard/SalesPrediction';


function App() {
  const isAdminLoggedIn = localStorage.getItem('role') === 'admin'; 

  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      {/* 관리자 로그인했을 때만 네비게이션 바 렌더링 */}
      {isAdminLoggedIn && <NavigationBar />}
      
      <Header />
      <main style={{ padding: '20px', minHeight: '80vh' }}>
        <Routes>
          {/* 사용자 페이지들 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
  
          <Route path="/admin-login" element={<AdminLoginPage />} />
          
          {/* 관리자 대시보드 페이지 */}
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly={true}>
                <DashboardPage />
              </PrivateRoute>
            }
          >
            </Route>
            <Route path="/sales-prediction" element={<SalesPrediction />} />
          

        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
