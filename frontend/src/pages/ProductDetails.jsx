import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    // Implement cart functionality
    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-images">
        <img 
          src={product.image || '/placeholder-image.jpg'} 
          alt={product.name}
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="category">Category: {product.category}</p>
        
        <div className="stock-status">
          {product.stock <= 0 ? (
            <p className="out-of-stock">Out of Stock</p>
          ) : (
            <p className="in-stock">In Stock: {product.stock} available</p>
          )}
        </div>

        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        {product.stock > 0 && (
          <div className="add-to-cart">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;