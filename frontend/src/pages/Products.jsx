import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/index.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    searchQuery: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let result = [...products];
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    );
    
    // Apply search filter
    if (filters.searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="products-page">
      <div className="filters-container">
        <div className="search-filter">
          <input
            type="text"
            name="searchQuery"
            placeholder="Search products..."
            value={filters.searchQuery}
            onChange={handleFilterChange}
          />
        </div>

        <div className="category-filter">
          <h3>Categories</h3>
          <div className="category-buttons">
            <button 
              className={!filters.category ? 'active' : ''}
              onClick={() => setFilters(prev => ({...prev, category: ''}))}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={filters.category === category.name ? 'active' : ''}
                onClick={() => setFilters(prev => ({...prev, category: category.name}))}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="price-filter">
          <h3>Price Range</h3>
          <div className="price-inputs">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <span>-</span>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onClick={() => navigate(`/products/${product.id}`)}
            />
          ))
        ) : (
          <div className="no-results">No products match your filters.</div>
        )}
      </div>
    </div>
  );
};

export default Products;