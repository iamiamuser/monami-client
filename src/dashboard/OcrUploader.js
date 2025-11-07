import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

function OcrUploader() {
  const [image, setImage] = useState(null); 
  const [isProcessing, setIsProcessing] = useState(false); 
  const [error, setError] = useState(null); 
  const [extractedData, setExtractedData] = useState(null); 

  // 이미지 파일을 업로드하고 상태 업데이트
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setError(null); 
      setExtractedData(null); 
    }
  };

  // OCR을 실행하는 함수
  const handleOCR = () => {
    if (!image) {
      setError("이미지를 업로드해 주세요.");
      return;
    }

    setIsProcessing(true); // OCR 처리 시작

    // 이미지 파일을 base64로 변환
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageBase64 = reader.result;

      // Tesseract.js를 이용해 OCR 실행
      Tesseract.recognize(
        imageBase64, 
        'eng', 
        {
          logger: (m) => console.log(m), 
        }
      )
      .then(({ data: { text } }) => {
        const extractedData = extractOrderDetails(text);
        setExtractedData(extractedData); 
        setIsProcessing(false); 
      })
      .catch((err) => {
        setError("OCR 처리 중 오류 발생");
        console.error(err);
        setIsProcessing(false); 
      });
    };
    reader.readAsDataURL(image); 
  };

  // OCR로 추출한 텍스트에서 주문 내역을 추출하는 함수
  const extractOrderDetails = (text) => {
    const orderRegex = /주문 ID : (\d+)\s*사용자 ID : (\d+)\s*주문 날짜 : (\d{4}-\d{2}-\d{2})\s*상태 : ([^\n]+)\s*총 금액 : (\d+원)/;
    const match = text.match(orderRegex);

    if (match) {
      return {
        orderId: match[1],
        userId: match[2],
        orderDate: match[3],
        status: match[4],
        totalAmount: match[5],
      };
    }
    return null; 
  };

  return (
    <div className="ocr-uploader-container">
      <h3>주문 내역 이미지 업로드</h3>

      {/* 이미지 파일 업로드 버튼 */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 오류 메시지 */}
      
      {/* 이미지가 업로드 되었을 때 OCR 버튼 표시 */}
      {image && !isProcessing && (
        <button onClick={handleOCR}>OCR 시작</button>
      )}

      {isProcessing && <p>OCR 처리 중...</p>} {/* OCR 처리 중 메시지 */}

      {/* 업로드한 이미지 미리보기 */}
      {image && !isProcessing && (
        <div>
          <h4>미리보기</h4>
          <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: '100%', maxWidth: '400px' }} />
        </div>
      )}

      {/* 추출된 주문 내역 표시 */}
      {extractedData && (
        <div>
          <h4>OCR로 추출된 주문 내역</h4>
          <table border="1" cellSpacing="0" cellPadding="10">
            <thead>
              <tr>
                <th>주문 ID</th>
                <th>사용자 ID</th>
                <th>주문 날짜</th>
                <th>상태</th>
                <th>총 금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{extractedData.orderId}</td>
                <td>{extractedData.userId}</td>
                <td>{extractedData.orderDate}</td>
                <td>{extractedData.status}</td>
                <td>{extractedData.totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OcrUploader;
