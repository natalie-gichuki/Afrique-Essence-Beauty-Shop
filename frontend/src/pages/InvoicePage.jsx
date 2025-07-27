// // src/pages/InvoicePage.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// //import axios from 'axios';

// const InvoicePage = () => {
//   const { id } = useParams();
//   const [invoice, setInvoice] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInvoice = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Or get it from Redux
//         const response = await axios.get(`http://localhost:5555/invoices/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setInvoice(response.data);
//       } catch (error) {
//         console.error('Failed to fetch invoice:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvoice();
//   }, [id]);

//   if (loading) return <div className="p-4">Loading...</div>;
//   if (!invoice) return <div className="p-4">Invoice not found.</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg print:bg-white print:shadow-none print:p-0">
//       <h2 className="text-2xl font-semibold mb-4 text-[#2c1d27]">Invoice #{invoice.id}</h2>

//       <div className="mb-6 text-sm">
//         <p><strong>Date:</strong> {new Date(invoice.created_at).toLocaleDateString()}</p>
//         <p><strong>Customer ID:</strong> {invoice.user_id}</p>
//         <p><strong>Total:</strong> ${invoice.total_price.toFixed(2)}</p>
//       </div>

//       <h3 className="text-lg font-bold mb-2">Items</h3>
//       <table className="w-full text-sm mb-6 border">
//         <thead>
//           <tr className="bg-[#f9f1f6]">
//             <th className="p-2 border">Product</th>
//             <th className="p-2 border">Qty</th>
//             <th className="p-2 border">Price</th>
//             <th className="p-2 border">Subtotal</th>
//           </tr>
//         </thead>
//         <tbody>
//           {invoice.items?.map((item) => (
//             <tr key={item.id} className="text-center">
//               <td className="p-2 border">{item.product_name}</td>
//               <td className="p-2 border">{item.quantity}</td>
//               <td className="p-2 border">${item.unit_price.toFixed(2)}</td>
//               <td className="p-2 border">${(item.quantity * item.unit_price).toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button
//         className="mt-4 px-4 py-2 bg-[#b87db7] text-white rounded hover:bg-[#9b5e9d] print:hidden"
//         onClick={() => window.print()}
//       >
//         Print Invoice
//       </button>
//     </div>
//   );
// };

// export default InvoicePage;

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { authHeaders } from '../services/cartService';

const InvoicePage = () => {
  const { orderId } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    axios.get(`/api/invoices/${orderId}`, authHeaders())
      .then(res => setInvoice(res.data))
      .catch(err => console.error(err));
  }, [orderId]);

  if (!invoice) return <div>Loading invoice...</div>;

  return (
  <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded">
    {invoice ? (
      <>
        <h2 className="text-3xl font-bold mb-6">Invoice #{invoice.id}</h2>
        <p className="mb-2">Generated At: {new Date(invoice.generated_at).toLocaleString()}</p>
        <p className="mb-2">Invoice URL: <a href={invoice.invoice_url} className="text-blue-600 underline">{invoice.invoice_url}</a></p>
        <p className="mb-2">Total: ${invoice?.total ? parseFloat(invoice.total).toFixed(2) : '0.00'}</p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Order Summary</h3>
        <ul className="space-y-2">
          {invoice.items?.map((item) => (
            <li key={item.product_id} className="border p-4 rounded">
              <h4 className="font-semibold">{item.name}</h4>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <p>Loading invoice...</p>
    )}
  </div>
);

};

export default InvoicePage;