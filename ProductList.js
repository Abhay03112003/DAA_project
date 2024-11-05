import React, { useState, useEffect } from 'react';
import { quickSort } from '../utils/quickSort';
import { binarySearchMultiple } from '../utils/binarySearch';

function ProductList({ products, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedProducts, setSortedProducts] = useState(products);
  const [originalProducts, setOriginalProducts] = useState(products); // Store original products

  useEffect(() => {
    setSortedProducts(products);
    setOriginalProducts(products); // Update original products whenever products change
  }, [products]);

  const handleSearch = () => {
    const field = isNaN(searchTerm) ? 'name' : 'sku';
    const sortedArray = quickSort([...originalProducts], field); // Sort based on the search field
  
    // Perform modified binary search to find multiple matches
    const foundProducts = binarySearchMultiple(sortedArray, searchTerm, field);
  
    if (foundProducts) {
      setSortedProducts(foundProducts); // Display all matching products
    } else {
      setSortedProducts([]); // No products found
    }
  };
  
  
  
  

  const handleShowAll = () => {
    setSortedProducts(originalProducts); // Show all products
    setSearchTerm(''); // Clear the search term
  };

  const handleSort = (field) => {
    const sorted = quickSort([...originalProducts], field); // Sort originalProducts
    setSortedProducts(sorted);
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by Name or SKU"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleShowAll}>Show All</button>
      <button onClick={() => handleSort('price')}>Sort by Price</button>
      <button onClick={() => handleSort('stock')}>Sort by Stock</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>SKU</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.sku}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.sku}</td>
              <td>
                <button onClick={() => onEdit(product)} className="edit">Edit</button>
                <button onClick={() => onDelete(product.sku)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
