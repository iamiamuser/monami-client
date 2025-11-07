import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './HomePage.css';
import { fetchProducts } from '../api/products';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function HomePage() {
  const location = useLocation();  
  const query = useQuery();
  const category = query.get('category');  

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts(category)
      .then(data => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, location.search]);  

  if (loading) return <p>상품을 불러오는 중입니다...</p>;
  if (products.length === 0) return <p>해당 카테고리의 상품이 없습니다.</p>;

  return (
    <div className="products-container">
      {products.map(product => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
}

export default HomePage;
