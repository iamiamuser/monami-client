export const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    console.error(`[API ERROR] ${status} - ${data.message || '에러 발생'}`);
    alert(data.message || '서버 오류가 발생했습니다.');
  } else {
    console.error('[API ERROR] 네트워크 오류');
    alert('네트워크 오류가 발생했습니다.');
  }
};
