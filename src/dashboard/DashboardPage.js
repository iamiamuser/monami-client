import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import OrderDetails from './OrderDetails'; 
import MonthlySalesChart from './MonthlySalesChart';  
import SalesPrediction from './SalesPrediction'; 

import './DashboardPage.css';  

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [salesPrediction, setSalesPrediction] = useState(null); 
  const [error, setError] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('주문 내역'); 
  const year = 2025; 

  // 메뉴 URL 맵
  const menuUrls = useMemo(() => ({
    '주문 내역': '/admin/orders',
    '월별 판매액': '/admin/monthly-sales',
    '판매 예측': '/api/sales/prediction/predict',
  }), []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        let url = `http://localhost:8080${menuUrls[selectedMenu]}`;

        // 1월~6월 기간 파라미터 필요한 메뉴들
        if (selectedMenu === '월별 판매액') {
          url += `?year=${year}&startMonth=1&endMonth=6`;
        }

        console.log('Fetching data from URL:', url);
        const response = await axios.get(url, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('API Response:', response.data);
        
        if (selectedMenu === '판매 예측') {
          setSalesPrediction(response.data.predictedSales); 
        } else {
          setDashboardData(response.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    if (selectedMenu) {
      fetchDashboardData();
    }
  }, [selectedMenu, year, menuUrls]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!dashboardData && selectedMenu !== '판매 예측') {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="dashboard-page-container">
      <h2>관리자 대시보드</h2>

      {/* 네비게이션 메뉴 */}
      <nav>
        <ul>
          {Object.keys(menuUrls).map(menuItem => (
            <li key={menuItem}>
              <button
                onClick={() => setSelectedMenu(menuItem)}
                className={selectedMenu === menuItem ? 'active' : ''}
              >
                {menuItem}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 선택된 메뉴에 따른 콘텐츠 */}
      <div className="chart-container">
        {selectedMenu === '월별 판매액' && (
          <>
            <h3>월별 판매 통계 (1월~6월)</h3>
            {Array.isArray(dashboardData) && dashboardData.length > 0 ? (
              <MonthlySalesChart data={dashboardData} />
            ) : (
              <div>데이터가 없습니다.</div>
            )}
          </>
        )}

        {selectedMenu === '주문 내역' && (
          <>
            <h3>주문 내역</h3>
            {Array.isArray(dashboardData) && dashboardData.length > 0 ? (
              <OrderDetails data={dashboardData} />
            ) : (
              <div>데이터가 없습니다.</div>
            )}
          </>
        )}

        {selectedMenu === '판매 예측' && (
          <>
            
            {/* 판매 예측 데이터를 props로 전달 */}
            {salesPrediction !== null ? (
              <SalesPrediction predictedSales={salesPrediction} />
            ) : (
              <div>판매 예측을 불러오는 중입니다...</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
