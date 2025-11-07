import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  

const NavigationBar = () => {
  const { user, logout } = useContext(AuthContext); 

  return (
    <nav>
      <ul>
        {/* 공통 메뉴 - 홈, 장바구니, 결제 */}
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/cart">장바구니</Link>
        </li>
        <li>
          <Link to="/checkout">결제</Link>
        </li>

        {/* 사용자가 로그인된 경우 */}
        {user ? (
          <>
            {/* 로그인한 사용자에게 표시 */}
            <li>
              <button onClick={logout}>로그아웃</button>  {/* 로그아웃 버튼 */}
            </li>
            <li>
              <span>{user.email}님, 안녕하세요!</span>  {/* 로그인된 사용자 표시 */}
            </li>

            {/* 관리자일 경우만 표시되는 메뉴 */}
            {user.role === 'admin' && (
              <>
                <li><Link to="/admin/dashboard-summary">대시보드 요약</Link></li>
                <li><Link to="/admin/monthly-sales">월별 판매액</Link></li>
                <li><Link to="/admin/monthly-orders">월별 주문 건수</Link></li>
                <li><Link to="/admin/category-sales">카테고리별 판매 수량</Link></li>
                <li><Link to="/admin/growth-rate">성장률</Link></li>
                <li><Link to="/admin/age-category-ranking">연령대별 카테고리 판매 순위</Link></li>
                <li><Link to="/admin/gender-category-ranking">성별 카테고리 판매 순위</Link></li>
                <li><Link to="/admin/sales-prediction">판매 예측</Link></li>
                <li><Link to="/admin/sales-strategy">판매 전략</Link></li>
              </>
            )}
          </>
        ) : (
          // 사용자가 로그인되지 않은 경우
          <>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/register">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
