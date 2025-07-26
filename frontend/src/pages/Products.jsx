import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../redux/slices/categorySlice';

const Product = () => {
  const dispatch = useDispatch();
  const { products, pagination, loading } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [filters, setFilters] = useState({ name: '', category: '', price: '' });
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ ...filters, page }));
    dispatch(fetchCategories());
  }, [filters, page]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 min-h-screen">
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          onChange={handleChange}
          className="px-3 py-2 rounded border border-purple-800 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-white"
        />
        <select
          name="category"
          onChange={handleChange}
          className="px-3 py-2 rounded border border-purple-800 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          placeholder="Max Price"
          onChange={handleChange}
          className="px-3 py-2 rounded border border-purple-800 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-800 bg-white"
        />
      </div>

      {loading ? (
        <p className="text-purple-800">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white border border-purple-200 hover:scale-110  p-4 shadow hover:shadow-md transition duration-200"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-60 w-full object-contain rounded mb-4"
                />
                <h3 className="text-purple-800 font-semibold">{product.name}</h3>
                <p className="text-gray-700">Ksh {product.price}</p>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex gap-2 flex-wrap">
            {Array.from({ length: pagination.pages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  page === i + 1
                    ? 'bg-purple-800 text-white'
                    : 'bg-purple-200 text-purple-800 hover:bg-violet-800 hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
