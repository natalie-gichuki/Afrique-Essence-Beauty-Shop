import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import Logo from '../assets/images/logo.jpg'
import { t } from 'i18next';

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
            <img src={Logo} alt="Logo" className="h-12" />
            <h2 className="text-xl font-semibold text-purple-800">{t('taxInvoice')}</h2>
            
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
            <p><strong>{t('orderNo')}:</strong> {orderNumber}</p>
            <p><strong>{t('invoiceNo')}:</strong> {invoiceNumber}</p>
            <p><strong>{t('invoiceDate')}:</strong> {today}</p>
            <p><strong>{t('expDate')}:</strong> {today} (1 PM to 2 PM)</p>
          </div>
          <div className="text-right">
            <p><strong>{t('storeInfo')}</strong></p>
            <p>Thika Road Mall</p>
            <p>Nairobi, Kenya</p>
            <p>0800 221322</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-4 border-b border-purple-200 pb-4 mb-6 text-sm">
          <div>
            <p className="text-purple-800 font-bold">{t('customer')}</p>
            <p>{customer.name}</p>
            <p>{customer.address}</p>
            <p>{customer.phone}</p>
          </div>
          <div className="text-right">
            <p className="text-purple-800 font-bold">{t('deliveryEmail')}</p>
            <p>{customer.email || 'n/a'}</p>
          </div>
        </div>

        {/* Order Table */}
        <div>
          <table className="w-full text-left text-sm border mb-4 border-purple-200">
            <thead className="bg-purple-200 text-gray-700">
              <tr>
                <th className="border border-purple-200 p-2">{t('description')}</th>
                <th className="border border-purple-200 p-2 text-center">{t('orderQtn')}</th>
                <th className="border border-purple-200 p-2 text-center">{t('deliveredQtn')}</th>
                <th className="border border-purple-200 p-2 text-right">{t('unitPrice')}</th>
                <th className="border border-purple-200 p-2 text-right">{t('totalPrice')}</th>
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
            <span>{t('totalAmount')} :</span>
            <span>KES {parseFloat(total).toFixed(2)}</span>
          </div>
        </div>

        {/* VAT */}
        <div className="border-t border-purple-200 mt-4 pt-4 text-sm">
          
          <p><strong>{t('amount')} :</strong> KES {parseFloat(total).toFixed(2)}</p>
          
        </div>

        {/* Footer */}
        <div className="border-t border-purple-200 mt-6 pt-4 text-sm flex justify-between">
          <div>
            <p><strong>{t('paymentType')}:</strong> Mpesa</p>
            <p><strong>{t('amount')}:</strong> KES {parseFloat(total).toFixed(2)}</p>
            <p><strong>{t('pickUp')}</strong></p>
          </div>
          <div className="text-right">
            <p><strong>{t('card')}:</strong> ********80830</p>
            <p><strong>{t('name')}:</strong> {customer.name}</p>
            
          </div>
        </div>

        <div className="text-center mt-8 text-xs text-gray-500">
          {t('thankYouShop')}<br />
         {t('refund')}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-purple-800 hover:bg-violet-800 text-white px-6 py-2 rounded-lg"
        >
          {t('download')}
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-purple-800 hover:bg-violet-800 text-white px-6 py-2 rounded-lg"
        >
          {t('backToHome')}
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
