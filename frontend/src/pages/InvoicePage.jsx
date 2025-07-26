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

import { useEffect, useState } from 'react';

const InvoicePage = () => {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('invoice');
    if (saved) {
      setInvoice(JSON.parse(saved));
    }
  }, []);

  if (!invoice)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No invoice found.</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-2 text-green-700">🧾 Invoice #{invoice.id}</h2>
      <p className="text-gray-600 mb-4">🗓️ Date: {invoice.date}</p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Billing Info</h3>
        <div className="text-gray-700 space-y-1 pl-2">
          <p>👤 <span className="font-medium">Name:</span> {invoice.billing?.name}</p>
          <p>📞 <span className="font-medium">Phone:</span> {invoice.billing?.phone}</p>
          <p>📍 <span className="font-medium">Address:</span> {invoice.billing?.address}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Items</h3>
        <ul className="space-y-1 pl-4 text-gray-700 list-disc">
          {invoice.items.map((item, i) => (
            <li key={i}>
              {item.name} × {item.quantity} = <span className="font-semibold">KES {item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xl font-bold text-green-800 text-right">
        Total: KES {invoice.total}
      </p>
    </div>
  );
};

export default InvoicePage;
