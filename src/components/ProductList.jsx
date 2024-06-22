import React, { useState, useEffect } from 'react';
import { fetchItems } from '../services/api';
import Product from './Product';

const ProductList = () => {
  const [items, setItems] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadItems = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const response = await fetchItems(10, lastKey);
    if (response.data.items.length > 0) {
      setItems((prevItems) => [...prevItems, ...response.data.items]);
      setLastKey(response.data.lastKey);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []); 

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        loadItems();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, lastKey]);

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {items.map((item) => (
          <Product key={item.ansi} item={item} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more products to load</p>}
    </div>
  );
};

export default ProductList;
