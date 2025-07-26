import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, fetchMyCart, createCart } from '../redux/slices/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart.cart);



  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id]);


  useEffect(() => {
    if (!cart && status === 'idle') {
      dispatch(fetchMyCart())
        .unwrap()
        .catch((err) => {
          if (err?.response?.status === 404) {
            dispatch(createCart()).then(() => dispatch(fetchMyCart()));
          }
        });
    }
  }, [cart, status, dispatch]);



  const addToCart = () => {
    console.log("cart:", cart);

    if (!cart || !cart.id) return alert("Cart not ready yet. Please wait...");

    console.log("🛒 Adding to cart:", {
      cartId: cart.id,
      productId: product.id,
      quantity,
    });

    dispatch(addItemToCart({
      product_id: product.id,
      quantity: quantity
    }));


    dispatch(fetchMyCart());
  };



  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 flex gap-6">
      <img src={product.image_url} alt={product.name} className="h-60 object-cover" />
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p>{product.description}</p>
        <p className="font-semibold">Ksh {product.price}</p>
        <div className="mt-2 flex items-center gap-2">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;