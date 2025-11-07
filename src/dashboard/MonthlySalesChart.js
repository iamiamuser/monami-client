import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function MonthlySalesChartWithGraph({ data }) {
  if (!data || data.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  // 차트 데이터 구성
  const chartData = {
    labels: data.map(({ month }) => `${month}월`),
    datasets: [
      {
        label: '총 판매액',
        data: data.map(({ totalSales }) => totalSales),
        fill: true,
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
        borderColor: 'rgba(255, 87, 34, 1)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => `${value.toLocaleString()}원`,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: context => `${context.parsed.y.toLocaleString()}원`,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Noto Sans KR, sans-serif' }}>
      {/* 월별 판매 요약 카드 */}
      <div
  style={{
    display: 'flex',
    gap: '12px',
    marginBottom: '40px',
    overflowX: 'auto',   
  }}
>
  {data.map(({ year, month, totalSales }) => (
    <div
      key={`${year}-${month}`}
      style={{
        border: '1px solid #ccc',
        borderRadius: '6px',
        padding: '12px',
        minWidth: '140px',
        flex: '0 0 auto',  
        background: '#f9f9f9',
        textAlign: 'center',
      }}
    >
      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
        {year}년 {month}월
      </h4>
      <p style={{ margin: 0 }}>
  {typeof totalSales === 'number' ? totalSales.toLocaleString() : '0'}원
</p>

    </div>
  ))}
</div>

      {/* 차트 */}
      <div>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default MonthlySalesChartWithGraph;
