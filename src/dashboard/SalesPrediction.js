import React from 'react';
import './SalesPrediction.css';  

const SalesPrediction = ({ predictedSales }) => {
  return (
    <div className="dashboard-container">
      <div className="sales-card">
        <h1 className="title">25년 7월 판매량 예측 금액</h1>
        {predictedSales !== null ? (
          <p className="sales-amount">
            {predictedSales.toLocaleString()} 원 
          </p>
        ) : (
          <p className="loading-text">판매 예측을 불러오는 중입니다...</p> 
        )}
      </div>
    </div>
  );
}

export default SalesPrediction;
