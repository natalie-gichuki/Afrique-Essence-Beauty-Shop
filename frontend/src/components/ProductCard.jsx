import React from 'react';
const ProductCard = ({ product, onClick }) => {
    return (
      <div className="product-card" onClick={onClick}>
        <div className="product-image">
          <img 
            src={product.image || '/placeholder-image.jpg'} 
            alt={product.name}
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="category">{product.category}</p>
          {product.stock <= 0 ? (
            <p className="out-of-stock">Out of Stock</p>
          ) : (
            <p className="in-stock">In Stock ({product.stock})</p>
          )}
        </div>
      </div>
    );
  };
  
  export default ProductCard;