import axios from './axiosInstance';

// 주문 생성 API 호출
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 결제 요청 API 호출
export const processPayment = async (paymentData) => {
  try {
    const response = await axios.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
