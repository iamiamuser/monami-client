// src/components/ProductCard.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './ProductCard.css';  

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();  

  const handleAddToCart = () => {
    // 장바구니에 담기 로직
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ product, quantity });
    localStorage.setItem('cart', JSON.stringify(cart));

    // 장바구니 페이지로 이동
    navigate('/cart');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="price">{product.price} 원</p>
        <div className="quantity-control">
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          장바구니 담기
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
