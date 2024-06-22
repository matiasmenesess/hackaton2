import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ item }) => {
  return (
    <div className="product">
      <img src={item.imgUrl} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.price}</p>
      <p>{item.stars} stars</p>
      <p>{item.asin}</p>

    </div>
  );
};

export default Product;
