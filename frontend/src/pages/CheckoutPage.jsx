import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [billingInfo, setBillingInfo] = useState({
    name: 'Jane Doe',
    email: 'jane@example.com',
    address: '123 Beauty Street',
  });

  const handleInputChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    // Dummy checkout logic - replace with actual backend call
    console.log('Processing payment with billing info:', billingInfo);
    console.log('Cart items:', cartItems);

    dispatch(clearCart());
    navigate('/invoice'); // simulate redirect after payment
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-purple-800">Checkout</h2>

      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Billing Info</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={billingInfo.name}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={billingInfo.email}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Email"
          />
          <input
            type="text"
            name="address"
            value={billingInfo.address}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Address"
          />
        </div>
      </div>

      <div className="mt-8 bg-fuchsia-50 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h3>
        <ul className="divide-y divide-purple-100">
          {cartItems.map((item, i) => (
            <li key={i} className="py-2 flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>Ksh {item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between font-bold text-purple-800">
          <span>Total:</span>
          <span>Ksh {total.toFixed(2)}</span>
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-purple-800 hover:bg-violet-800 text-white py-3 rounded-xl transition"
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
