import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import EditForm from './components/EditForm'; // Import the EditForm component
import './styles.css';

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = { ...product};
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleEditSave = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.sku === updatedProduct.sku ? updatedProduct : product
      )
    );
  };

  const handleDeleteProduct = (sku) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      const updatedProducts = products.filter((product) => product.sku !== sku);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };
  

  const openEditPopup = (product) => setEditingProduct(product); // Open edit popup
  const closeEditPopup = () => setEditingProduct(null); // Close edit popup

  return (
    <div className="App">
      <h1>Inventory Management System</h1>
      <ProductForm onAddProduct={addProduct} />
      <ProductList products={products} onEdit={openEditPopup} onDelete={handleDeleteProduct} />

      {/* Show EditForm popup if a product is being edited */}
      {editingProduct && (
        <EditForm
          product={editingProduct}
          onSave={handleEditSave}
          onClose={closeEditPopup}
        />
      )}
    </div>
  );
}

export default App;
