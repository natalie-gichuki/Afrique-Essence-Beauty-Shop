// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getProductById, createProduct, updateProduct } from '../../../services/productService';

// export default function ProductForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     name: '',
//     price: '',
//     description: '',
//     stock: '',
//     image: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (id) {
//       fetchProduct();
//     }
//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const data = await getProductById(id);
//       setProduct(data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       if (id) {
//         await updateProduct(id, product);
//       } else {
//         await createProduct(product);
//       }
//       navigate('/admin/products');
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Product' : 'Add New Product'}</h1>

//       {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//             Product Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
//             Price ($)
//           </label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={product.price}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             min="0"
//             step="0.01"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             rows="4"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
//             Stock Quantity
//           </label>
//           <input
//             type="number"
//             id="stock"
//             name="stock"
//             value={product.stock}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             min="0"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//             Image URL
//           </label>
//           <input
//             type="text"
//             id="image"
//             name="image"
//             value={product.image}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             disabled={loading}
//           >
//             {loading ? 'Saving...' : (id ? 'Update Product' : 'Add Product')}
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate('/admin/products')}
//             className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import productService from '../../../services/productService';

// export default function ProductForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     name: '',
//     price: '',
//     description: '',
//     stock: '',
//     image: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (id) {
//       fetchProduct();
//     }
//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const data = await productService.getProductById(id);
//       setProduct(data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       if (id) {
//         await productService.updateProduct(id, product);
//       } else {
//         await productService.createProduct(product);
//       }
//       navigate('/admin/products');
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Product' : 'Add New Product'}</h1>

//       {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//             Product Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
//             Price ($)
//           </label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={product.price}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             min="0"
//             step="0.01"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             rows="4"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
//             Stock Quantity
//           </label>
//           <input
//             type="number"
//             id="stock"
//             name="stock"
//             value={product.stock}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             min="0"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//             Image URL
//           </label>
//           <input
//             type="text"
//             id="image"
//             name="image"
//             value={product.image}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             disabled={loading}
//           >
//             {loading ? 'Saving...' : (id ? 'Update Product' : 'Add Product')}
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate('/admin/products')}
//             className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


// src/pages/ProductForm.jsx
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addProduct, editProduct } from '../../../redux/productSlice';
// import { getAllCategories } from '../../../services/categoryService'; // adjust path if needed
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const ProductForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { productId } = useParams();
//   const products = useSelector((state) => state.products?.items || []);
//   const token = useSelector((state) => state.auth.user?.access_token);

//   const editingProduct = products.find((p) => p.id === parseInt(productId));
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     stock: '',
//     image_url: '',
//     category_id: '',
//   });

//   useEffect(() => {
//     getAllCategories()
//       .then(setCategories)
//       .catch((err) => console.error('Error fetching categories:', err));
//   }, []);


//   useEffect(() => {
//     if (editingProduct) {
//       setFormData({
//         name: editingProduct.name,
//         description: editingProduct.description,
//         price: editingProduct.price,
//         stock: editingProduct.stock || '',
//         image_url: editingProduct.image_url || '',
//         category_id: editingProduct.category?.id || '',
//       });
//     }
//   }, [editingProduct]);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const productData = {
//       ...formData,
//       price: parseFloat(formData.price),
//       stock: parseInt(formData.stock || '0'),
//     };

//     if (productId) {
//       dispatch(editProduct({ productId, productData, token }));
//     } else {
//       dispatch(addProduct({ productData, token }));
//     }

//     navigate('/products');
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4">{productId ? 'Edit' : 'Add'} Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Product name"
//           className="w-full border px-4 py-2 rounded"
//           required
//         />
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="w-full border px-4 py-2 rounded"
//         />
//         <input
//           name="price"
//           type="number"
//           value={formData.price}
//           onChange={handleChange}
//           placeholder="Price"
//           className="w-full border px-4 py-2 rounded"
//           required
//         />
//         <input
//           name="stock"
//           type="number"
//           value={formData.stock}
//           onChange={handleChange}
//           placeholder="Stock"
//           className="w-full border px-4 py-2 rounded"
//         />
//         <input
//           name="image_url"
//           type="text"
//           value={formData.image_url}
//           onChange={handleChange}
//           placeholder="Image URL"
//           className="w-full border px-4 py-2 rounded"
//         />
//         <select
//           name="category_id"
//           value={formData.category_id}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//           required
//         >
//           <option value="">-- Select Category --</option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {productId ? 'Update' : 'Create'} Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, fetchProductById } from '../../../redux/slices/productSlice';
import { fetchCategories } from '../../../redux/slices/categorySlice';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);
  const { product } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: ''
  });

  useEffect(() => {
    dispatch(fetchCategories());
    if (isEdit) dispatch(fetchProductById(id));
  }, [id]);

  useEffect(() => {
    if (isEdit && product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image_url,
        category_id: product.category_id,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateProduct({ id, productData: formData }));
    } else {
      dispatch(createProduct(formData));
    }
    navigate('/admin/products');
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? 'Edit Product' : 'Add New Product'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Shea Butter Lotion"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Product details..."
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (KES)</label>
          <input
            type="number"
            name="price"
            placeholder="e.g. 1200"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            name="image_url"
            placeholder="Paste product image URL"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-300"
          >
            {isEdit ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
