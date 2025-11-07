import axios from './axiosInstance';

// OCR 이미지 업로드 API
export async function uploadOCRImage(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await axios.post('/ocr/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
}

// OCR 결과 조회 API
export function getOCRResults() {
  return axios.get('/ocr/results');
}

// 매출 조회 API
export function getSalesData() {
  return axios.get('/sales/summary');
}
