// src/pages/CartPage.jsx
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  const handleRemove = (id) => dispatch(removeFromCart(id));
  const handleQuantity = (id, quantity) => dispatch(updateQuantity({ id, quantity }));

  return (
    <div className="min-h-screen bg-fuchsia-50 px-6 py-12">
      <h2 className="text-3xl font-semibold text-purple-800 mb-6">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white rounded-xl shadow p-4"
            >
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg" />
                <div>
                  <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => handleQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 border rounded px-2 py-1"
                />
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-8">
            <p className="text-xl text-purple-900 font-semibold">
              Total: ${total.toFixed(2)}
            </p>
            <button className="mt-4 px-6 py-2 bg-purple-800 text-white rounded hover:bg-violet-800">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
