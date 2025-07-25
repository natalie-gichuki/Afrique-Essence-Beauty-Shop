
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getProducts, deleteProduct } from "../../redux/apiCalls";

// const ProductList = () => {
//   const [products, setProducts] = useState([]); // Store fetched products
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [error, setError] = useState(null);     // Track error state

//   // Fetch products on component mount
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getProducts();
//         setProducts(data);
//       } catch (err) {
//         setError(err.message || "Something went wrong.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Handle delete product
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this product?");
//     if (!confirmDelete) return;

//     try {
//       await deleteProduct(id);
//       // Remove deleted product from the list
//       setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
//     } catch (err) {
//       alert("Failed to delete product.");
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 font-semibold text-center py-6">Error: {error}</div>;
//   }

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Product List</h2>
//         <Link
//           to="/admin/products/new"
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add New Product
//         </Link>
//       </div>

//       <div className="overflow-x-auto shadow-md rounded">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2 text-left">Image</th>
//               <th className="border px-4 py-2 text-left">Name</th>
//               <th className="border px-4 py-2 text-left">Price</th>
//               <th className="border px-4 py-2 text-left">Category</th>
//               <th className="border px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center py-6 text-gray-500">
//                   No products found.
//                 </td>
//               </tr>
//             ) : (
//               products.map((product) => (
//                 <tr key={product.id} className="hover:bg-gray-50 transition">
//                   <td className="border px-4 py-2">
//                     <img
//                       src={product.image_url}
//                       alt={product.name}
//                       className="h-12 w-12 object-cover rounded"
//                     />
//                   </td>
//                   <td className="border px-4 py-2">{product.name}</td>
//                   <td className="border px-4 py-2">Ksh {product.price}</td>
//                   <td className="border px-4 py-2">{product.category?.name || "Uncategorized"}</td>
//                   <td className="border px-4 py-2 space-x-2">
//                     <Link
//                       to={`/admin/products/edit/${product.id}`}
//                       className="text-blue-500 hover:underline"
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(product.id)}
//                       className="text-red-500 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// import React, { useEffect, useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import { productService } from "../../../services/productService";
// import { useAuth } from "../../../context/AuthContext";

// const ProductList = () => {
//   const { user } = useAuth();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);

//   // Redirect non-admin users to customer products page
//   if (user?.role !== 'admin') {
//     return <Navigate to="/products" replace />;
//   }

//   // Fetch products and categories on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productsData, categoriesData] = await Promise.all([
//           productService.getAllProducts(),
//           productService.getCategories()
//         ]);
//         setProducts(productsData);
//         setCategories(categoriesData);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message || "Failed to fetch data");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this product?");
//     if (!confirmDelete) return;

//     try {
//       await productService.deleteProduct(id);
//       setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
//     } catch (err) {
//       alert(err.message || "Failed to delete product");
//     }
//   };

//   const getCategoryName = (categoryId) => {
//     const category = categories.find(cat => cat.id === categoryId);
//     return category ? category.name : "Uncategorized";
//   };

//   if (loading) {
//     return <div className="text-center py-10">Loading products...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 font-semibold text-center py-6">Error: {error}</div>;
//   }

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Admin Product Management</h2>
//         <div className="space-x-4">
//           <Link
//             to="/admin/products/new"
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Add New Product
//           </Link>
//         </div>
//       </div>

//       <div className="overflow-x-auto shadow-md rounded">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2 text-left">Image</th>
//               <th className="border px-4 py-2 text-left">Name</th>
//               <th className="border px-4 py-2 text-left">Price</th>
//               <th className="border px-4 py-2 text-left">Category</th>
//               <th className="border px-4 py-2 text-left">Stock</th>
//               <th className="border px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-500">
//                   No products found.
//                 </td>
//               </tr>
//             ) : (
//               products.map((product) => (
//                 <tr key={product.id} className="hover:bg-gray-50 transition">
//                   <td className="border px-4 py-2">
//                     {product.image_url ? (
//                       <img
//                         src={product.image_url}
//                         alt={product.name}
//                         className="h-12 w-12 object-cover rounded"
//                       />
//                     ) : (
//                       <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
//                         <span className="text-xs text-gray-500">No Image</span>
//                       </div>
//                     )}
//                   </td>
//                   <td className="border px-4 py-2">{product.name}</td>
//                   <td className="border px-4 py-2">Ksh {product.price?.toFixed(2) || '0.00'}</td>
//                   <td className="border px-4 py-2">{getCategoryName(product.category_id)}</td>
//                   <td className="border px-4 py-2">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                     }`}>
//                       {product.stock || 0} in stock
//                     </span>
//                   </td>
//                   <td className="border px-4 py-2 space-x-2">
//                     <Link
//                       to={`/admin/products/edit/${product.id}`}
//                       className="text-blue-500 hover:underline"
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(product.id)}
//                       className="text-red-500 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// src/pages/ProductList.jsx
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, removeProduct } from '../../../redux/productSlice';
// import { Link } from 'react-router-dom';

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const { items: products = [], loading = false, error = null } = useSelector(
//     (state) => state.products || {}
//   );

//   const token = useSelector((state) => state.auth.user?.access_token);

//   useEffect(() => {
//     dispatch(fetchProducts(token));
//   }, [dispatch, token]);

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       dispatch(removeProduct({ productId: id, token }));
//     }
//   };

//   if (loading) return <p className="text-center mt-4">Loading products...</p>;
//   if (error) return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Product List</h2>
//         <Link
//           to="/admin/products/new"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Add Product
//         </Link>
//       </div>
//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">ID</th>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Price</th>
//               <th className="border px-4 py-2">Category</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id} className="text-center">
//                 <td className="border px-4 py-2">{product.id}</td>
//                 <td className="border px-4 py-2">{product.name}</td>
//                 <td className="border px-4 py-2">Ksh {product.price}</td>
//                 <td className="border px-4 py-2">{product.category || 'N/A'}</td>
//                 <td className="border px-4 py-2 space-x-2">
//                   <Link
//                     to={`/admin/products/edit/${product.id}`}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(product.id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../redux/slices/productSlice';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleDelete = (id) => {
    if (confirm('Delete this product?')) dispatch(deleteProduct(id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">All Products</h2>
        <Link to="/admin/products/new" className="bg-green-600 text-white px-4 py-2 rounded">Add Product</Link>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Name</th><th>Price</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} className="text-center border-t">
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.category}</td>
              <td>
                <Link to={`/admin/products/edit/${prod.id}`} className="text-blue-500 mr-2">Edit</Link>
                <button onClick={() => handleDelete(prod.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;