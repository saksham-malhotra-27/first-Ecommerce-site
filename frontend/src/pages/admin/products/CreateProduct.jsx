import React, { useState } from 'react';
import Layout from '../../../components/Layout/Layout.jsx';
import slugify from 'slugify';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../context/auth.jsx';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productShipping, setProductShipping] = useState(false);
  const [productPhoto, setProductPhoto] = useState(null);

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('slug', slugify(productName));
      formData.append('description', productDescription);
      formData.append('price', productPrice);
      formData.append('category', productCategory);
      formData.append('quantity', productQuantity);
      formData.append('shipping', productShipping);
      formData.append('avatar', productPhoto);

      const response = await axios.post(
        'http://localhost:5000/api/v1/products/create-product',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: auth.token,
          },
        }
      );

      if (response.data.success) {
        navigate('/dashboard/admin/edit-products');
        setTimeout(() => {
          toast.success(response.data.message);
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred while creating the product. Please try again.');
      console.error('Error creating product:', err);
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          textAlign: 'center',
          display: 'flex',
          flexFlow: 'column',
          border: '2px solid black',
          borderRadius: '2rem',
          padding: '2rem',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          boxShadow: '2px 2px 16px black',
        }}
      >
        <h1 style={{ color: 'pink', textShadow: '1px 1px 2px orange' }}>Create Product</h1>
        <div className="form-group" style={{ width: '30vw', height: '50vh', display: 'flex', flexFlow: 'column', justifyContent: 'space-evenly' }}>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            placeholder="Enter Product Name"
            className="form-text text-muted"
          />
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            placeholder="Enter Product Description"
            className="form-text text-muted"
          />
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            placeholder="Enter Product Price"
            className="form-text text-muted"
          />
          <input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
            placeholder="Enter Product Category ID"
            className="form-text text-muted"
          />
          <input
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            required
            placeholder="Enter Product Quantity"
            className="form-text text-muted"
          />
          <label style={{color:"whitesmoke", textAlign:"left"}}>
            Shipping:
            <input
              type="checkbox" 
              required
              checked={productShipping}
              onChange={() => setProductShipping(!productShipping)}
            />
          </label>
          <input
            type="file"
            onChange={(e) => setProductPhoto(e.target.files[0])}
            accept="image/*"
          />
          <button type="submit" style={{ width: '7vw', minWidth: '83.44px' }} className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default CreateProduct;
