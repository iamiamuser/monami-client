import React from 'react';

function CartItem({ item }) {
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.product.imageUrl} alt={item.product.name} />
      </div>
      <div className="cart-item-details">
        <h3>{item.product.name}</h3>
        <p>수량: {item.quantity}</p>
        <p>가격: {item.product.price * item.quantity} 원</p>
      </div>
    </div>
  );
}

export default CartItem;
