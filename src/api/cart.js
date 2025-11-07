import axios from './axiosInstance';

// 장바구니 목록 조회
export const getCartItems = async () => {
  const response = await axios.get('/cart');
  return response.data;
};

// 장바구니 아이템 추가
export const addToCart = async (productId, quantity = 1) => {
  const response = await axios.post('/cart', { productId, quantity });
  return response.data;
};

// 장바구니 아이템 수량 수정
export const updateCartItem = async (cartItemId, quantity) => {
  const response = await axios.put(`/cart/${cartItemId}`, { quantity });
  return response.data;
};

// 장바구니 아이템 삭제
export const deleteCartItem = async (cartItemId) => {
  const response = await axios.delete(`/cart/${cartItemId}`);
  return response.data;
};
