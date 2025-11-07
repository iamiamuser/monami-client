import axios from './axiosInstance';
import { handleApiError } from '../utils/errorHandler';

// category가 없으면 전체 상품, 있으면 카테고리별 상품 조회
export const fetchProducts = async (category) => {
  try {
    let url = '/products';  
    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    handleApiError(error, '상품 목록을 불러오는 중 문제가 발생했습니다.');
    throw error;
  }
};
