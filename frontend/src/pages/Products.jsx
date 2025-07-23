import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';
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
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          productService.getCategories()
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

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

  const applyFilters = () => {
    let result = [...products];
    
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    result = result.filter(product => 
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    );
    
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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const createdProduct = await productService.createProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock)
      });
      
      setProducts(prev => [...prev, createdProduct]);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: ''
      });
      setShowAddForm(false);
      alert(`Product "${createdProduct.name}" added successfully!`);
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="products-page">
      <div className="products-header">
        <h2>Products</h2>
        <button 
          className="add-product-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-product-form">
          <h3>Add New Product</h3>
          <form onSubmit={handleAddProduct}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={handleNewProductChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleNewProductChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={handleNewProductChange}
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={handleNewProductChange}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={newProduct.category}
                onChange={handleNewProductChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="url"
                name="image"
                placeholder="Image URL (optional)"
                value={newProduct.image}
                onChange={handleNewProductChange}
              />
            </div>

            <button type="submit" className="submit-btn">
              Add Product
            </button>
          </form>
        </div>
      )}

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