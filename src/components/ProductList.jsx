import React, { useState, useEffect } from 'react';
import { fetchItems } from '../services/api';
import Product from './Product';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
  const [items, setItems] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const handleSpecific = async () => {
    navigate("/search");
  };

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

    <button className="search-button" onClick={handleSpecific}>
        Wanna search for a specific item?
      </button>

      <h1>Product List</h1>
      <div className="product-list">
        {items.map((item) => (
        <Product key={item.asin} item={item} />
    ))}
      </div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more products to load</p>}
    </div>
  );
};

export default ProductList;
