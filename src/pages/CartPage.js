import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleCheckboxChange = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(i => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleRemoveSelected = () => {
    if (selectedItems.length === 0) {
      alert('삭제할 항목을 선택하세요.');
      return;
    }
    const updatedCart = cartItems.filter((_, index) => !selectedItems.includes(index));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSelectedItems([]); 
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      navigate('/checkout', { state: { cartItems } });
    }
  };

  return (
    <div className="container">
      <h2>장바구니</h2>
      {cartItems.length === 0 ? (
        <p>장바구니에 담긴 상품이 없습니다.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <input
                type="checkbox"
                checked={selectedItems.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
              <div className="cart-item-image">
                <img src={item.product.imageUrl} alt={item.product.name} />
              </div>
              <div className="cart-item-info">
                <h3>{item.product.name}</h3>
                <p>수량: {item.quantity}</p>
                <p>가격: {item.product.price * item.quantity} 원</p>
              </div>
            </div>
          ))}
          <div className="checkout-container">
            <button className="remove-button" onClick={handleRemoveSelected}>
              선택 삭제하기
            </button>
            <button className="checkout-button" onClick={handleCheckout}>
              결제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
