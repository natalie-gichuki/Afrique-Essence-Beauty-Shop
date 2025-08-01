import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMyCart,
  updateCartItem,
  deleteCartItem,
} from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import {t} from 'i18next';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchMyCart());
  }, [dispatch]);

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem({ itemId, data: { quantity } }));
  };

  const handleRemove = (itemId) => {
    dispatch(deleteCartItem(itemId));
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
  };

  if (status === 'loading') {
    return <p className="text-center text-gray-700 mt-8">Loading cart...</p>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return <p className="text-center text-gray-500 mt-8">🛍️ Your cart is empty.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-fuchsia-200 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-purple-200">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">🛒 {t('yourCart')}t</h2>

        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b border-purple-100 py-4">
            <div className="flex items-center gap-4">
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-xl shadow-sm"
              />
              <div>
                <h3 className="font-semibold text-gray-700">{item.product.name}</h3>
                <p className="text-gray-600">Ksh {item.product.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition"
              >
                −
              </button>
              <span className="text-gray-700">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition"
              >
                +
              </button>
              <button
                onClick={() => handleRemove(item.id)}
                className="ml-4 text-red-500 hover:underline"
              >
                {t('remove')}
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">{t('total')}:</h3>
          <p className="text-xl font-bold text-purple-800">Ksh {calculateTotal()}</p>
        </div>

        <div className="mt-6 text-right">
          <Link to="/checkout">
            <button className="bg-purple-800 hover:bg-violet-800 text-white px-6 py-3 rounded-xl transition-all">
              {t('proceedToCheckout')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
