import React, { useState, useEffect } from 'react';
import { createItem, editItem, deleteItem, fetchItems } from '../services/api';

const Admin = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    boughtInLastMonth: '',
    imgUrl: '',
    isBestSeller: false,
    price: '',
    stars: '',
    title: '',
  });
  const [editFormData, setEditFormData] = useState({
    itemId: '',
    boughtInLastMonth: '',
    imgUrl: '',
    isBestSeller: false,
    price: '',
    stars: '',
    title: '',
  });
  const [deleteItemId, setDeleteItemId] = useState('');

  useEffect(() => {
    const loadItems = async () => {
      const response = await fetchItems();
      setItems(response.data.items);
    };

    loadItems();
  }, []);

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    await createItem(formData);
    setFormData({
      boughtInLastMonth: '',
      imgUrl: '',
      isBestSeller: false,
      price: '',
      stars: '',
      title: '',
    });
    const response = await fetchItems();
    setItems(response.data.items);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editItem(editFormData);
    setEditFormData({
      itemId: '',
      boughtInLastMonth: '',
      imgUrl: '',
      isBestSeller: false,
      price: '',
      stars: '',
      title: '',
    });
    const response = await fetchItems();
    setItems(response.data.items);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    await deleteItem(deleteItemId);
    setDeleteItemId('');
    const response = await fetchItems();
    setItems(response.data.items);
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <form className="admin-form" onSubmit={handleCreateSubmit}>
        <h2>Create Item</h2>
        <input name="boughtInLastMonth" value={formData.boughtInLastMonth} onChange={handleCreateChange} placeholder="Bought In Last Month" />
        <input name="imgUrl" value={formData.imgUrl} onChange={handleCreateChange} placeholder="Image URL" />
        <input name="isBestSeller" type="checkbox" checked={formData.isBestSeller} onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })} /> Best Seller
        <input name="price" value={formData.price} onChange={handleCreateChange} placeholder="Price" />
        <input name="stars" value={formData.stars} onChange={handleCreateChange} placeholder="Stars" />
        <input name="title" value={formData.title} onChange={handleCreateChange} placeholder="Title" />
        <button type="submit">Create</button>
      </form>

      <form className="admin-form" onSubmit={handleEditSubmit}>
        <h2>Edit Item</h2>
        <input name="itemId" value={editFormData.itemId} onChange={handleEditChange} placeholder="Item ID" />
        <input name="boughtInLastMonth" value={editFormData.boughtInLastMonth} onChange={handleEditChange} placeholder="Bought In Last Month" />
        <input name="imgUrl" value={editFormData.imgUrl} onChange={handleEditChange} placeholder="Image URL" />
        <input name="isBestSeller" type="checkbox" checked={editFormData.isBestSeller} onChange={(e) => setEditFormData({ ...editFormData, isBestSeller: e.target.checked })} /> Best Seller
        <input name="price" value={editFormData.price} onChange={handleEditChange} placeholder="Price" />
        <input name="stars" value={editFormData.stars} onChange={handleEditChange} placeholder="Stars" />
        <input name="title" value={editFormData.title} onChange={handleEditChange} placeholder="Title" />
        <button type="submit">Edit</button>
      </form>

      <form className="admin-form" onSubmit={handleDeleteSubmit}>
        <h2>Delete Item</h2>
        <input name="itemId" value={deleteItemId} onChange={(e) => setDeleteItemId(e.target.value)} placeholder="Item ID" />
        <button type="submit">Delete</button>
      </form>

      
    </div>
  );
};

export default Admin;
