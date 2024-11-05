import React, { useState } from 'react';

function EditForm({ product, onSave, onClose }) {
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);

  const handleSave = () => {
    onSave({ ...product, price, stock });
    onClose(); // Close the popup after saving
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Edit Product</h3>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        
        <label>Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />
        
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default EditForm;
