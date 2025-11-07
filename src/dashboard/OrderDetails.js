import React, { useState } from 'react';
import './OrderDetails.css';

import html2canvas from 'html2canvas';
import Tesseract from 'tesseract.js';
import * as XLSX from 'xlsx'; 

function OrderDetails({ data }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [searchUserId, setSearchUserId] = useState(''); 
  const [selectedStatus, setSelectedStatus] = useState(''); 
  const [extractedData, setExtractedData] = useState(null); 
  const [isProcessing, setIsProcessing] = useState(false); 
  const [image, setImage] = useState(null); 

  const handleMonthFilter = (month) => {
    setSelectedMonth(month);
  };

  // 이미지 다운로드 처리
  const handleDownloadImage = () => {
    const orderDetailsElement = document.getElementById('order-details');

    html2canvas(orderDetailsElement).then((canvas) => {
      const imageURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = 'order_details.png';
      link.click();
      
      // OCR 처리 시작
      handleOCR(imageURL);
    });
  };

  // 이미지 업로드 처리
  const handleFileUpload = (event) => {
    const file = event.target.files[0];  
    if (file) {
      const imageURL = URL.createObjectURL(file);  
      setImage(imageURL);  
      handleOCR(imageURL);  
    }
  };

  // OCR 처리
  const handleOCR = (imageURL) => {
    setIsProcessing(true); 

    Tesseract.recognize(
      imageURL, 
      'eng', 
      {
        logger: (m) => console.log(m), 
      }
    ).then(({ data: { text } }) => {
      const extracted = extractOrderDetails(text);
      setExtractedData(extracted); 
      setIsProcessing(false); 
    }).catch((error) => {
      console.error("OCR 처리 중 오류 발생:", error);
      setIsProcessing(false); 
    });
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

  // 필터링된 데이터
  const filteredData = data.filter((order) => {
    const isMonthMatch = selectedMonth ? new Date(order.orderDate).getMonth() + 1 === selectedMonth : true;
    const isUserIdMatch = searchUserId 
      ? String(order.userId).trim().toLowerCase() === searchUserId.trim().toLowerCase()
      : true;
    const isStatusMatch = selectedStatus 
      ? String(order.status).trim().toLowerCase() === selectedStatus.toLowerCase() 
      : true;

    return isMonthMatch && isUserIdMatch && isStatusMatch;
  });


// 엑셀 다운로드 처리
const handleDownloadExcel = () => {
  // 필터링된 데이터로 워크시트 생성
  const ws = XLSX.utils.json_to_sheet(filteredData);

  // 셀 스타일 추가
  const headerStyle = {
    font: { bold: true, color: { rgb: 'FFFFFF' } }, 
    fill: { fgColor: { rgb: '4F81BD' } }, 
    alignment: { horizontal: 'center', vertical: 'center' }, 
  };

  const columns = ws['!cols'] || []; 
  ws['!cols'] = [
    ...columns,
    { wpx: 120 }, 
    { wpx: 200 },
    { wpx: 150 },
    { wpx: 100 },
    { wpx: 120 },
  ];

  // 헤더에 스타일 적용
  const range = XLSX.utils.decode_range(ws['!ref']); 
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cell = ws[XLSX.utils.encode_cell({ r: range.s.r, c: col })]; 
    if (cell) {
      cell.s = headerStyle; 
    }
  }

  // 새로운 워크북 생성
  const wb = XLSX.utils.book_new();
  
  // 워크북에 워크시트 추가
  XLSX.utils.book_append_sheet(wb, ws, 'OrderDetails');
  
  // 엑셀 파일 다운로드
  XLSX.writeFile(wb, 'order_details.xlsx');
};

  
  return (
    <div className="order-details-container">
      <div className="filters">
        {/* 월 필터 */}
        <div className="month-buttons">
          {['1', '2', '3', '4', '5', '6'].map((month) => (
            <button key={month} onClick={() => handleMonthFilter(Number(month))}>
              {month}월
            </button>
          ))}
          <button onClick={() => setSelectedMonth(null)}>전체 보기</button>
        </div>

        {/* 사용자 ID 검색 */}
        <div className="search-user-id">
          <input 
            type="text" 
            placeholder="사용자 ID 검색" 
            value={searchUserId} 
            onChange={(e) => setSearchUserId(e.target.value)} 
          />
        </div>

        {/* 주문 상태 필터 */}
        <div className="status-filter">
          <select onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus}>
            <option value="">상태 선택</option>
            <option value="배송완료">배송완료</option>
            <option value="배송중">배송중</option>
            <option value="결제완료">결제완료</option>
            <option value="환불요청">환불요청</option>
          </select>
        </div>

        {/* 이미지 업로드 */}
        <div className="file-upload">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload} 
          />
        </div>
      </div>

      <h4>주문 내역</h4>
      {filteredData.length === 0 ? (
        <p>해당 조건에 맞는 주문 내역이 없습니다.</p>
      ) : (
        <div>
          <div id="order-details">
            <table>
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
                {filteredData.map(order => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.userId}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.status}</td>
                    <td>{order.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={handleDownloadImage}>주문 내역 이미지 다운로드</button>
          <button onClick={handleDownloadExcel}>엑셀 다운로드</button> 
        </div>
      )}

      {/* OCR 추출된 주문 내역 표시 */}
      {isProcessing ? (
        <p>이미지에서 주문 내역을 추출하는 중...</p>
      ) : extractedData ? (
        <div>
          <h4>OCR로 추출된 주문 내역</h4>
          <table>
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
      ) : null}
      
      {/* 업로드된 이미지 미리보기 */}
      {image && <img src={image} alt="Uploaded" width="200" />}
    </div>
  );
}

export default OrderDetails;
