// // src/pages/CartPage.jsx
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';

// export default function CartPage() {
//   const dispatch = useDispatch();
//   const { items, total } = useSelector(state => state.cart ?? {items : [], total : 0});

//   const handleRemove = (id) => dispatch(removeFromCart(id));
//   const handleQuantity = (id, quantity) => dispatch(updateQuantity({ id, quantity }));

//   return (
//     <div className="min-h-screen bg-fuchsia-50 px-6 py-12">
//       <h2 className="text-3xl font-semibold text-purple-800 mb-6">Your Cart</h2>
//       {items.length === 0 ? (
//         <p className="text-gray-600">Your cart is empty.</p>
//       ) : (
//         <div className="space-y-6">
//           {items.map(item => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between bg-white rounded-xl shadow p-4"
//             >
//               <div className="flex items-center gap-4">
//                 <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg" />
//                 <div>
//                   <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
//                   <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <input
//                   type="number"
//                   value={item.quantity}
//                   min={1}
//                   onChange={(e) => handleQuantity(item.id, parseInt(e.target.value))}
//                   className="w-16 border rounded px-2 py-1"
//                 />
//                 <button
//                   onClick={() => handleRemove(item.id)}
//                   className="text-sm text-red-600 hover:underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="text-right mt-8">
//             <p className="text-xl text-purple-900 font-semibold">
//               Total: ${total.toFixed(2)}
//             </p>
//             <button className="mt-4 px-6 py-2 bg-purple-800 text-white rounded hover:bg-violet-800">
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     fetchMyCart,
//     addItemToCart,
//     updateCartItem,
//     deleteCartItem,
//     clearCartState
// } from '../redux/slices/cartSlice';
// import { useNavigate } from 'react-router-dom';

// // Mock product price map – Replace with real product data or API
// const productPrices = {
//     1: 500,   // product_id: price
//     2: 1200,
//     3: 800,
// };

// const getProductPrice = (productId) => productPrices[productId] || 0;

// const CartPage = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { cart, status, error } = useSelector((state) => state.cart);
//     const [quantities, setQuantities] = useState({});

//     useEffect(() => {
//         if (!cart) {
//             dispatch(fetchMyCart());
//         }
//         return () => {
//             dispatch(clearCartState());
//         };
//     }, [dispatch]);

//     useEffect(() => {
//         if (cart?.items) {
//             const initialQuantities = {};
//             cart.items.forEach(item => {
//                 initialQuantities[item.id] = item.quantity;
//             });
//             setQuantities(initialQuantities);
//         }
//     }, [cart]);

//     const handleQuantityChange = (itemId, value) => {
//         setQuantities((prev) => ({
//             ...prev,
//             [itemId]: parseInt(value)
//         }));
//     };

//     const handleUpdate = (itemId) => {
//         dispatch(updateCartItem({ itemId, data: { quantity: quantities[itemId] } }));
//     };

//     const handleDelete = (itemId) => {
//         dispatch(deleteCartItem(itemId));
//     };

//     const handleAddDummyItem = () => {
//         if (cart) {
//             dispatch(addItemToCart({
//                 cartId: cart.id,
//                 item: { product_id: 1, quantity: 1 } // Replace with real product_id
//             }));
//         }
//     };

//     const handleCheckout = () => {
//         navigate('/checkout');
//     };

//     const calculateTotal = () => {
//         if (!cart?.items) return 0;
//         return cart.items.reduce((acc, item) => {
//             const price = getProductPrice(item.product_id);
//             const quantity = quantities[item.id] || item.quantity;
//             return acc + price * quantity;
//         }, 0);
//     };

//     const total = calculateTotal();

//     if (status === 'loading') return <p className="p-4 text-gray-600">Loading cart...</p>;
//     if (error) return <p className="p-4 text-red-500">Error: {error.msg || error}</p>;

//     return (
//         <div className="max-w-3xl mx-auto mt-6 p-4">
//             <h1 className="text-2xl font-semibold mb-4">🛒 My Cart</h1>

//             {!cart || cart.items?.length === 0 ? (
//                 <p className="text-gray-500">Your cart is empty.</p>
//             ) : (
//                 <div className="space-y-4">
//                     {cart.items.map((item) => {
//                         const price = getProductPrice(item.product_id);
//                         const quantity = quantities[item.id] || item.quantity;
//                         const itemTotal = price * quantity;

//                         return (
//                             <div
//                                 key={item.id}
//                                 className="border rounded-lg p-4 flex items-center justify-between shadow-sm"
//                             >
//                                 <div>
//                                     <p className="font-medium">Product ID: {item.product_id}</p>
//                                     <p className="text-sm text-gray-600">Price: KSh {price.toLocaleString()}</p>
//                                     <label className="text-sm text-gray-600">Quantity: </label>
//                                     <input
//                                         type="number"
//                                         min="1"
//                                         className="w-16 ml-2 p-1 border rounded"
//                                         value={quantity}
//                                         onChange={(e) => handleQuantityChange(item.id, e.target.value)}
//                                     />
//                                     <p className="text-sm mt-1">Item Total: KSh {itemTotal.toLocaleString()}</p>
//                                 </div>

//                                 <div className="flex gap-2">
//                                     <button
//                                         onClick={() => handleUpdate(item.id)}
//                                         className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                                     >
//                                         Update
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(item.id)}
//                                         className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}

//             <div className="mt-6 flex justify-between items-center border-t pt-4">
//                 <div>
//                     <p className="text-xl font-semibold">
//                         🧾 Total: <span className="text-green-700">KSh {total.toLocaleString()}</span>
//                     </p>
//                 </div>
//                 <button
//                     onClick={handleCheckout}
//                     className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//                 >
//                     ✅ Proceed to Checkout
//                 </button>
//             </div>

//             <div className="mt-4">
//                 <button
//                     onClick={handleAddDummyItem}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                     ➕ Add Dummy Item
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CartPage;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMyCart,
  updateCartItem,
  deleteCartItem,
} from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

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
        <h2 className="text-2xl font-bold text-purple-800 mb-6">🛒 Your Cart</h2>

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
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Total:</h3>
          <p className="text-xl font-bold text-purple-800">Ksh {calculateTotal()}</p>
        </div>

        <div className="mt-6 text-right">
          <Link to="/checkout">
            <button className="bg-purple-800 hover:bg-violet-800 text-white px-6 py-3 rounded-xl transition-all">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
