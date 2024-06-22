import React, { useState } from 'react';
import { fetchItemById } from '../services/api';

const ProductPage = () => {
  const [asin, setAsin] = useState('');
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetchItemById(asin);
      setItem(response.data);
    } catch (err) {
      setError('Error fetching item. Please check the ASIN and try again.');
      setItem(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search for a specific item</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Enter ASIN"
          value={asin}
          onChange={(e) => setAsin(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {item && (
        <div>
          <h2>{item.title}</h2>
          <img src={item.imgUrl} alt={item.title} />
          <p>Price: {item.price}</p>
          <p>Stars: {item.stars}</p>
          <p>Description: {item.description}</p>
          <p>ASIN: {item.asin}</p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
