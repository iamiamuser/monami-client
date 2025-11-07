import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const categories = [
  '고급 볼펜',
  '유성 볼펜',
  '샤프',
  '샤프심',
  '노트',
  '수정용품',
];

export default function Header() {
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);

  // 로딩 중일 땐 아무것도 안 보여줌
  if (loading) return null;

  return (
    <header className="header-container">
      {/* 가운데 카테고리 */}
      <nav className="center-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className="category-button"
            onClick={() => navigate(`/?category=${encodeURIComponent(cat)}`)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* 가운데 monami 문구 */}
      <div className="center-logo">
        <h1>MONAMI 모나미</h1>
      </div>

      {/* 오른쪽 메뉴 */}
      <nav className="right-menu">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>홈</NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>장바구니</NavLink>
        <NavLink to="/checkout" className={({ isActive }) => (isActive ? 'active' : '')}>결제</NavLink>

        {/* 로그인 상태에 따라 로그인/회원가입 또는 로그아웃 버튼 렌더링 */}
        {user ? (
          <>
            <span className="welcome-text">{user.email}님</span>
            <button className="logout-button" onClick={() => { logout(); navigate('/'); }}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>로그인</NavLink>
            <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>회원가입</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
