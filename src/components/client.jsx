import React, { useState, useEffect } from 'react';
import { addToCart, removeFromCart, buyCart, getCart } from '../services/api';

const Client = () => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState('');
  const [itemId, setItemId] = useState('');

  const handleLoadCart = async (e) => {
    e.preventDefault();
    const response = await getCart(userId);
    setCart(response.data);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    await addToCart({ itemId, userId });
    const response = await getCart(userId);
    setCart(response.data);
  };

  const handleRemoveFromCart = async (e) => {
    e.preventDefault();
    await removeFromCart({ itemId, userId });
    const response = await getCart(userId);
    setCart(response.data);
  };

  const handleBuyCart = async (e) => {
    e.preventDefault();
    await buyCart(userId);
    setCart([]);
  };

  return (
    <div className="client-container">
      <h1>Client Panel</h1>

      <form className="client-form" onSubmit={handleLoadCart}>
        <h2>Load Cart</h2>
        <input 
          name="userId" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          placeholder="User ID" 
          required 
        />
        <button type="submit">Load Cart</button>
      </form>

      <form className="client-form" onSubmit={handleAddToCart}>
        <h2>Add Item to Cart</h2>
        <input 
          name="itemId" 
          value={itemId} 
          onChange={(e) => setItemId(e.target.value)} 
          placeholder="Item ID" 
          required 
        />
        <input 
          name="userId" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          placeholder="User ID" 
          required 
        />
        <button type="submit">Add to Cart</button>
      </form>

      <form className="client-form" onSubmit={handleRemoveFromCart}>
        <h2>Remove Item from Cart</h2>
        <input 
          name="itemId" 
          value={itemId} 
          onChange={(e) => setItemId(e.target.value)} 
          placeholder="Item ID" 
          required 
        />
        <input 
          name="userId" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          placeholder="User ID" 
          required 
        />
        <button type="submit">Remove from Cart</button>
      </form>

      <form className="client-form" onSubmit={handleBuyCart}>
        <h2>Buy Cart</h2>
        <input 
          name="userId" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          placeholder="User ID" 
          required 
        />
        <button type="submit">Buy Cart</button>
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
    </div>
  );
};

export default Client;
