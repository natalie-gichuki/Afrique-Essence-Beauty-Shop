import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import { t } from 'i18next';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, pagination, loading } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  

  useEffect(() => {
    dispatch(fetchProducts({ page }));
  }, [page]);

  const handleDelete = (id) => {
    if (confirm('Delete this product?')) {
      dispatch(deleteProduct(id)).then(() => {
        dispatch(fetchProducts({ page }));
      });
    }
  };

  const renderPagination = () => {
    const pages = pagination.pages;
    const current = pagination.current_page;
    const buttons = [];

    for (let i = 1; i <= pages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 border rounded 
            ${i === current ? 'bg-purple-800 text-white' : 'bg-white text-gray-700'} 
            hover:bg-violet-800 hover:text-white transition`}
        >
          {i}
        </button>
      );
    }

    return <div className="flex gap-2 mt-6 justify-center">{buttons}</div>;
  };

  return (
    <div className="p-6 bg-fuchsia-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">🛍️ {t('allProducts')}</h2>
        <Link
          to="/admin/products/new"
          className="bg-purple-800 hover:bg-violet-800 text-white px-4 py-2 rounded-lg transition"
        >
          {t('addProducts')}
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-700">Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto shadow rounded-lg border border-purple-200 bg-white">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-purple-200 text-left">
                <tr>
                  <th className="py-3 px-4">{t('name')}</th>
                  <th className="py-3 px-4">{t('price')}</th>
                  <th className="py-3 px-4">{t('category')}</th>
                  <th className="py-3 px-4 text-center">{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id} className="border-t hover:bg-fuchsia-100 transition">
                    <td className="py-3 px-4">{prod.name}</td>
                    <td className="py-3 px-4">KES {prod.price}</td>
                    <td className="py-3 px-4">{prod.category}</td>
                    <td className="py-3 px-4 text-center">
                      <Link
                        to={`/admin/products/edit/${prod.id}`}
                        className="text-purple-800 hover:underline mr-4"
                      >
                        {t('edit')}
                      </Link>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="text-red-600 hover:underline"
                      >
                        {t('delete')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default ProductList;
