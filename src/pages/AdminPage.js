import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import './AdminPage.css';

function AdminPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  useEffect(() => {
    const Test = async () => {
      try {
        // API 요청 URL을 수정
        const response = await axios.get("http://localhost:8080/", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        // 성공적으로 요청을 받은 후 대시보드로 이동
        console.log(response.data);  

        // 테스트 성공 후 대시보드로 이동
        navigate('/dashboard');  
      } catch (err) {
        setError("테스트 오류");
      }
    };
    Test();
  }, [navigate]);  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>관리자 페이지</h1>
      <p>관리자 페이지에 오신 것을 환영합니다.</p>
    </div>
  );
}

export default AdminPage;
