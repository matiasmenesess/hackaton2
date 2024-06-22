import React, { useState, useEffect } from 'react';
import { addToCart, removeFromCart, buyCart, getCart } from '../services/api';

const Client = () => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem('userId');
  const [itemId, setItemId] = useState('');

  useEffect(() => {
    const loadCart = async () => {
      if (userId) {
        const response = await getCart(userId);
        setCart(response.data);
      }
    };

    loadCart();
  }, [userId,cart]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    await addToCart({ itemId, userId });
    const response = await getCart(userId);
    setCart(response.data);
  };

  const handleRemoveFromCart = async (itemId) => {
    await removeFromCart({ itemId, userId });
    const response = await getCart(userId);
    setCart(response.data);
  };

  const handleBuyCart = async () => {
    await buyCart(userId);
    setCart([]);
  };

  return (
    <div className="client-container">
      <h1>Client Panel</h1>

      <form className="client-form" onSubmit={handleAddToCart}>
        <h2>Add Item to Cart</h2>
        <input 
          name="itemId" 
          value={itemId} 
          onChange={(e) => setItemId(e.target.value)} 
          placeholder="Item ID" 
          required 
        />
        <button type="submit">Add to Cart</button>
      </form>

      <h2>Cart Items</h2>
      <ul>
        {cart.map(item => (
          <li key={item.itemId}>
            {item.itemId} (ansi) - Quantity: {item.qty}
            <button onClick={() => handleRemoveFromCart(item.itemId)}>Remove</button>
          </li>
        ))}
      </ul>

      <button className="buy-button" onClick={handleBuyCart}>Buy Cart</button>
    </div>
  );
};

export default Client;
