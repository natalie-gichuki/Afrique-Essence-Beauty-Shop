// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearCart } from '../redux/slices/cartSlice';
// import { useNavigate } from 'react-router-dom';

// const CheckoutPage = () => {
//   const cartItems = useSelector((state) => state.cart?.items || []);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [billingInfo, setBillingInfo] = useState({
//     name: 'Jane Doe',
//     email: 'jane@example.com',
//     address: '123 Beauty Street',
//   });

//   const handleInputChange = (e) => {
//     setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
//   };

//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handlePayment = async () => {
//     // Dummy checkout logic - replace with actual backend call
//     console.log('Processing payment with billing info:', billingInfo);
//     console.log('Cart items:', cartItems);

//     dispatch(clearCart());
//     navigate('/invoice'); // simulate redirect after payment
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-12 px-4">
//       <h2 className="text-3xl font-bold mb-6 text-purple-800">Checkout</h2>

//       <div className="bg-white shadow p-6 rounded-lg">
//         <h3 className="text-xl font-semibold mb-4">Billing Info</h3>
//         <div className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             value={billingInfo.name}
//             onChange={handleInputChange}
//             className="w-full border px-4 py-2 rounded"
//             placeholder="Full Name"
//           />
//           <input
//             type="email"
//             name="email"
//             value={billingInfo.email}
//             onChange={handleInputChange}
//             className="w-full border px-4 py-2 rounded"
//             placeholder="Email"
//           />
//           <input
//             type="text"
//             name="address"
//             value={billingInfo.address}
//             onChange={handleInputChange}
//             className="w-full border px-4 py-2 rounded"
//             placeholder="Address"
//           />
//         </div>
//       </div>

//       <div className="mt-8 bg-fuchsia-50 p-6 rounded-lg shadow">
//         <h3 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h3>
//         <ul className="divide-y divide-purple-100">
//           {cartItems.map((item, i) => (
//             <li key={i} className="py-2 flex justify-between">
//               <span>{item.name} (x{item.quantity})</span>
//               <span>Ksh {item.price * item.quantity}</span>
//             </li>
//           ))}
//         </ul>
//         <div className="mt-4 flex justify-between font-bold text-purple-800">
//           <span>Total:</span>
//           <span>Ksh {total.toFixed(2)}</span>
//         </div>

//         <button
//           onClick={handlePayment}
//           className="mt-6 w-full bg-purple-800 hover:bg-violet-800 text-white py-3 rounded-xl transition"
//         >
//           Confirm & Pay
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;


// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { API_URL } from '../config';
// import { toast } from 'react-toastify';

// const CheckoutPage = () => {
//   const { cartItems, totalPrice } = useSelector(state => state.cart);
//   const { user } = useSelector(state => state.auth);
//   const navigate = useNavigate();

//   const [address, setAddress] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!user) navigate('/login');
//   }, [user, navigate]);

//   const handleCheckout = async () => {
//     if (!address.trim()) {
//       toast.error('Shipping address is required');
//       return;
//     }

//     setLoading(true);
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`
//         }
//       };

//       const payload = {
//         address,
//         items: cartItems.map(item => ({
//           product_id: item.id,
//           quantity: item.quantity
//         }))
//       };

//       const res = await axios.post(`${API_URL}/checkout`, payload, config);
//       toast.success('Order placed successfully!');
//       navigate('/orders');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Checkout failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <div className="p-8 text-center">
//         <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//           onClick={() => navigate('/products')}
//         >
//           Shop Now
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Checkout</h2>

//       <div className="space-y-4">
//         {cartItems.map(item => (
//           <div
//             key={item.id}
//             className="flex justify-between items-center border-b pb-2"
//           >
//             <div>
//               <h3 className="text-lg font-semibold">{item.name}</h3>
//               <p className="text-gray-500">Quantity: {item.quantity}</p>
//             </div>
//             <p className="font-medium">KSh {(item.price * item.quantity).toLocaleString()}</p>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6">
//         <h3 className="text-xl font-semibold">Total: KSh {totalPrice.toLocaleString()}</h3>
//       </div>

//       <div className="mt-6">
//         <label className="block mb-2 font-medium">Shipping Address</label>
//         <textarea
//           value={address}
//           onChange={e => setAddress(e.target.value)}
//           rows={4}
//           className="w-full p-3 border rounded resize-none"
//           placeholder="Enter your delivery address"
//         />
//       </div>

//       <button
//         onClick={handleCheckout}
//         className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50"
//         disabled={loading}
//       >
//         {loading ? 'Processing...' : 'Place Order'}
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyCart } from '../redux/slices/cartSlice';
import { createOrder } from '../redux/orderSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, status } = useSelector((state) => state.cart);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    dispatch(fetchMyCart());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderPayload = {
      phone: form.phone,
      address: form.address,
      cart_items: cart.items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      }))
    };

    try {
      const resultAction = await dispatch(createOrder(orderPayload));
      if (createOrder.fulfilled.match(resultAction)) {
        navigate(`/invoice/${resultAction.payload.invoice.id}`);
      } else {
        console.error('Order creation failed:', resultAction.error);
      }
    } catch (err) {
      console.error('Failed to create order:', err);
    }
  };
  if (status === 'loading') {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-fuchsia-50 to-fuchsia-200 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">🧾 Checkout</h2>

        {/* Cart Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Your Items</h3>
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="text-purple-700 font-semibold">
                Ksh {(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 text-xl font-bold">
            <span>Total:</span>
            <span className="text-purple-700">Ksh {calculateTotal()}</span>
          </div>
        </div>

        {/* Billing Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Billing Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-xl hover:bg-purple-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;


