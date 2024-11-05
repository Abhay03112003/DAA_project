import React, { useState } from 'react';

function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', sku: '' });
  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({ ...formData, price: Number(formData.price), stock: Number(formData.stock) });
    setFormData({ name: '', price: '', stock: '', sku: '' });
    setFormVisible(false); // Close form after submit
  };

  return (
    <div className="collapsible-form">
      <button className="toggle-btn" onClick={toggleFormVisibility}>
        {isFormVisible ? 'Hide Form' : 'Add New Product'}
      </button>
      
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="product-form">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
          <input name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
          <input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" required />
          <button type="submit">Add Product</button>
        </form>
      )}
    </div>
  );
}

export default ProductForm;
