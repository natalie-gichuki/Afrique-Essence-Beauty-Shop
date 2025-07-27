import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, fetchMyCart } from '../redux/slices/cartSlice';

import Swal from 'sweetalert2';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart.cart);
  

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchMyCart())
  }, [dispatch, id]);

  

  const addToCart = () => {
    console.log("cart", cart)
    if (!cart || !cart.id) return alert("Cart not ready yet. Please wait...");

    dispatch(addItemToCart({
      product_id: product.id,
      quantity,
      
    }));
    dispatch(fetchMyCart());
  };



  if (!product) return <p className="text-center mt-10 text-gray-500">Loading product...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl w-full flex flex-col md:flex-row items-center gap-8">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-80 h-80 object-cover rounded-xl shadow"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-purple-700 text-xl font-semibold mb-4">Ksh {product.price}</p>

          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200"
            >
              −
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200"
            >
              +
            </button>
          </div>

          <button
            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-xl transition-all"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
