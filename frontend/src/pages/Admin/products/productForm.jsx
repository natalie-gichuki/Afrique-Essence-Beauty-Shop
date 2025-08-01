import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, fetchProductById } from '../../../redux/slices/productSlice';
import { fetchCategories } from '../../../redux/slices/categorySlice';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { t } from 'i18next';

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
      Swal.fire({
        icon: 'success',
        title: 'Product Updated!',
        text: 'The product was successfully updated.',
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      dispatch(createProduct(formData));
      Swal.fire({
        icon: 'success',
        title: 'Product Created!',
        text: 'The product was successfully added.',
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false,
      });
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
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('productName')}</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('description')}</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('price')} (KES)</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('imageURL')}</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('category')}</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <option value="">{t('selectCategory')}</option>
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
