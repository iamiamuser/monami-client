import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckoutPage.css'; 

function CheckoutPage() {
  const location = useLocation(); 
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // CartPage에서 전달된 cartItems 데이터를 가져옴
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
    }
  }, [location]);

  const handleCompletePayment = () => {
    alert('결제가 완료되었습니다.');
    // 결제 완료 후 장바구니 데이터 삭제
    localStorage.removeItem('cart');
    navigate('/');  
  };

  return (
    <div className="checkout-container">
      <h2>결제 페이지</h2>
      {cartItems.length === 0 ? (
        <p>장바구니에 담긴 상품이 없습니다.</p>
      ) : (
        <div>
          <h3>결제할 상품 목록</h3>
          {cartItems.map((item, index) => (
            <div key={index} className="checkout-item">
              <div className="checkout-item-image">
                <img src={item.product.imageUrl} alt={item.product.name} />
              </div>
              <div className="checkout-item-info">
                <h4>{item.product.name}</h4>
                <p>수량: {item.quantity}</p>
                <p>가격: {item.product.price * item.quantity} 원</p>
              </div>
            </div>
          ))}
          <button className="complete-payment-button" onClick={handleCompletePayment}>
            결제 완료
          </button>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
