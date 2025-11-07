import React, { useState, useContext, useEffect } from 'react';
import { loginAdmin } from '../api/auth'; 
import { validateEmail, validatePassword } from '../utils/validation';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 새로 고침 시 로그인 상태를 확인해서 자동 로그인 처리
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); 
      navigate('/admin/dashboard'); 
    }
  }, [navigate, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedEmail = email.trim().toLowerCase();

    if (!validateEmail(formattedEmail)) {
      setError('유효한 이메일을 입력하세요.');
      return;
    }

    if (!validatePassword(password)) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    try {
      const { user } = await loginAdmin({ email: formattedEmail, password });

      // 로그인 성공 시 user 정보와 token을 로컬 스토리지에 저장
      localStorage.setItem('user', JSON.stringify(user)); 
      localStorage.setItem('token', user.token); 

      setUser(user); 
      navigate('/admin'); 
    } catch (err) {
      setError(err.message || '로그인 실패: 이메일과 비밀번호를 확인하세요.');
    }
  };

  return (
    <div className="login-page-container">
      <h2>관리자 로그인</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
