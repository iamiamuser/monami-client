import axiosInstance from './axiosInstance';

const AUTH_BASE = '/auth';

// 사용자 로그인 함수
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post(`${AUTH_BASE}/login`, { email, password });

    const { token, user } = response.data;

    localStorage.setItem('token', token); 

    return { user, token };
  } catch (error) {
    console.error('User Login error:', error);
    throw new Error(
      error.response ? error.response.data.message : '서버와의 연결에 실패했습니다.'
    );
  }
};

// 관리자 로그인 함수
export const loginAdmin = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post(`${AUTH_BASE}/admin-login`, { email, password });

    const { token, user } = response.data;

    localStorage.setItem('token', token); 

    return { user, token };
  } catch (error) {
    console.error('Admin Login error:', error);
    throw new Error(
      error.response ? error.response.data.message : '서버와의 연결에 실패했습니다.'
    );
  }
};

// 회원가입
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post(`${AUTH_BASE}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : '회원가입 중 오류가 발생했습니다.'
    );
  }
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem('token');
};

// 현재 사용자 정보 불러오기
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(`${AUTH_BASE}/me`);
    return response.data;
  } catch (error) {
    throw new Error('사용자 정보를 불러오는 중 오류가 발생했습니다.');
  }
};
