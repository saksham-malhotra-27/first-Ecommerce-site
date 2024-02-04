import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import slugify from 'slugify';
import axios from 'axios';

function Cart() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (auth && auth.user && auth.user.cart && auth.user.cart.length > 0) {
          const cartProductinfo = await axios.get('http://localhost:5000/api/v1/cart/show', {
            headers: {
              authorization: auth.token
            }
          });

          console.log('Cart Product Info:', cartProductinfo.data);

          // Check if 'fetchingCart' exists in the response
          if (cartProductinfo.data && cartProductinfo.data.fetchingCart) {
            const cartProductNames = cartProductinfo.data.fetchingCart.cart.map(item => item.product_name.toLowerCase());

            // Create an array of promises for fetching each product
            const productPromises = cartProductNames.map(async (productName) => {
              try {
                const response = await axios.get(`http://localhost:5000/api/v1/products/${slugify(productName)}`);
                return response.data.product;
              } catch (error) {
                throw new Error(error.response?.data.message || 'Failed to fetch product');
              }
            });

            // Execute all promises concurrently
            const productResults = await Promise.all(productPromises);

            setProducts(productResults);
          } else {
            toast.error('Cart information not found in the response');
          }
        } else {
          toast.error('User or cart information is missing');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Something unexpected happened');
      }
    };

    fetchProducts();
  }, [auth]);

  return (
    <Layout>
      <div style={{width:"100%", display:"flex", flexDirection:"column", gap:"5vh"}}>
        {products && products.length > 0 ? (
          products.map(product => (
            <NavLink key={product._id} to={`/product/${slugify(product.name.toLowerCase())}`} style={{ textDecoration: 'none', color: 'white' }}>
              <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1635315619556-5826839a1bea?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", display: 'flex', borderTop: '1px solid white', borderBottom: '1px solid white', gap: '3rem', flexFlow: 'row', width:"100%" }}>
                <div>
                  <img src={`/${product.photo.filename}`} style={{ width: '10rem' }} alt={product.name} />
                  <h1>{product.name}</h1>
                  <h2>${product.price}</h2>
                </div>
                <p style={{ textAlign: 'center', position: 'relative', top: '6rem' }}>{product.description}</p>
              </div>
            </NavLink>
          ))
        ) : (
          <h1>No Items</h1>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
