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
import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const InvoicePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  if (!state) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No invoice data. Please checkout first.
      </div>
    );
  }

  const { customer, items, total } = state;
  const today = new Date().toLocaleDateString();
  const invoiceNumber = Math.floor(Math.random() * 1000000);
  const orderNumber = Date.now();

  const handleDownloadPDF = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0.3,
      filename: `Invoice_${invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="min-h-screen bg-fuchsia-50 px-6 py-10 text-gray-700 font-sans">
      <div className="max-w-4xl mx-auto border border-purple-200 rounded-xl shadow-lg p-8 bg-white" ref={invoiceRef}>
        {/* Header */}
        <div className="flex justify-between items-center border-b border-purple-200 pb-4 mb-6">
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Carrefour_logo.svg/1280px-Carrefour_logo.svg.png" alt="Logo" className="h-10" />
            <h2 className="text-xl font-semibold text-purple-800">Tax Invoice</h2>
            <p className="text-xs text-gray-500">ETR is available on physical invoice</p>
          </div>
          <div className="text-right text-sm">
            <p>AFRIQUE ESSENCE BEAUTY SHOP</p>
            <p>PO BOX: 2012-00621 Nairobi, Kenya</p>
            <p>PIN: P051522497N</p>
            <p>M-PESA Paybill: 722502</p>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="flex justify-between mb-6 text-sm">
          <div>
            <p><strong>Order No:</strong> {orderNumber}</p>
            <p><strong>Invoice No:</strong> {invoiceNumber}</p>
            <p><strong>Invoice Date:</strong> {today}</p>
            <p><strong>Exp. Del. Date:</strong> {today} (1 PM to 2 PM)</p>
          </div>
          <div className="text-right">
            <p><strong>Store Information</strong></p>
            <p>Thika Road Mall</p>
            <p>Nairobi, Kenya</p>
            <p>0800 221322</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-4 border-b border-purple-200 pb-4 mb-6 text-sm">
          <div>
            <p className="text-purple-800 font-bold">CUSTOMER INFORMATION</p>
            <p>{customer.name}</p>
            <p>{customer.address}</p>
            <p>{customer.phone}</p>
          </div>
          <div className="text-right">
            <p className="text-purple-800 font-bold">Delivery Email</p>
            <p>{customer.email || 'n/a'}</p>
          </div>
        </div>

        {/* Order Table */}
        <div>
          <table className="w-full text-left text-sm border mb-4 border-purple-200">
            <thead className="bg-purple-200 text-gray-700">
              <tr>
                <th className="border border-purple-200 p-2">Description</th>
                <th className="border border-purple-200 p-2 text-center">Ordered Qty</th>
                <th className="border border-purple-200 p-2 text-center">Delivered Qty</th>
                <th className="border border-purple-200 p-2 text-right">Unit Price</th>
                <th className="border border-purple-200 p-2 text-right">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} className="border-t border-purple-100">
                  <td className="p-2 border border-purple-100">{item.product.name}</td>
                  <td className="p-2 border border-purple-100 text-center">{item.quantity}</td>
                  <td className="p-2 border border-purple-100 text-center">{item.quantity}</td>
                  <td className="p-2 border border-purple-100 text-right">Ksh {item.product.price.toFixed(2)}</td>
                  <td className="p-2 border border-purple-100 text-right">Ksh {(item.product.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between text-sm font-bold text-purple-800">
            <span>Total Amount Incl. VAT:</span>
            <span>KES {parseFloat(total).toFixed(2)}</span>
          </div>
        </div>

        {/* VAT */}
        <div className="border-t border-purple-200 mt-4 pt-4 text-sm">
          <p><strong>VAT %:</strong> 0.00%</p>
          <p><strong>Amount Excl. VAT:</strong> KES {parseFloat(total).toFixed(2)}</p>
          <p><strong>VAT Amount:</strong> 0.00</p>
        </div>

        {/* Footer */}
        <div className="border-t border-purple-200 mt-6 pt-4 text-sm flex justify-between">
          <div>
            <p><strong>Payment Type:</strong> Cash on Delivery</p>
            <p><strong>Amount:</strong> KES {parseFloat(total).toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p><strong>MyClub Card:</strong> ********80830</p>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Previous Balance:</strong> 463.7</p>
            <p><strong>Earned Points:</strong> 21.88</p>
            <p><strong>New Balance:</strong> 0</p>
          </div>
        </div>

        <div className="text-center mt-8 text-xs text-gray-500">
          Thank you for shopping at Afrique Essence<br />
          14 days exchange / Refund upon approval
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-purple-800 hover:bg-violet-800 text-white px-6 py-2 rounded-lg"
        >
          Download Invoice (PDF)
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-purple-800 hover:bg-violet-800 text-white px-6 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
