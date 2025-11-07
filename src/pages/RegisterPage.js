// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { register } from '../api/auth'; 
import { validateEmail, validatePassword, validateBirthdate } from '../utils/validation'; 
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState(''); 

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('이름을 입력하세요.');
      return;
    }

    if (!validateEmail(email)) {
      setError('유효한 이메일을 입력하세요.');
      return;
    }

    if (!validatePassword(password)) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    if (!validateBirthdate(birthdate)) {
      setError('생년월일 형식이 올바르지 않습니다. 예: 1990-01-01');
      return;
    }

    if (gender !== 'm' && gender !== 'f') {
      setError('성별을 선택하세요.');
      return;
    }

    try {
      await register({ name, email, password, birthdate, gender });
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (err) {
      setError('이미 가입된 이메일 주소입니다.');
    }
  };

  return (
    <div className="register-page-container">
      <h2>회원가입</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <input
          type="text"
          placeholder="생년월일 (예: 1990-01-01)"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />

        <div className="gender-group">
          <input
            type="radio"
            id="gender-m"
            name="gender"
            value="m"
            checked={gender === 'm'}
            onChange={() => setGender('m')}
            required
          />
          <label htmlFor="gender-m">남성 (M)</label>

          <input
            type="radio"
            id="gender-f"
            name="gender"
            value="f"
            checked={gender === 'f'}
            onChange={() => setGender('f')}
            required
          />
          <label htmlFor="gender-f">여성 (F)</label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
