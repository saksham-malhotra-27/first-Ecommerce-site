import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/auth';
import { Button, Modal } from 'react-bootstrap';
import { useAppContext } from '../../context/cartContext';

function ProductDetails() {
  const { productName } = useParams();
  const lowerProductName = productName.toLowerCase();
  const slug = slugify(lowerProductName);
  const [auth, setAuth] = useAuth();
  const [productDetails, setProductDetails] = useState([]);
  const [cartUpdated, updateCart ] = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/products/${slug}`);
        if (response.data.success) {
          setProductDetails(response.data.product);
        } else {
          toast.error('No such product');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchData();
  }, [slug]);

  const handleAddToCart = async () => {
    try {
      // Prepare the data to send in the request body
      const cartData = {
        name: productDetails.name,
        quantity: parseInt(quantity),
      };
  
      // Make the axios request to update the cart
      const response = await axios.put('http://localhost:5000/api/v1/cart/addtocart', cartData, {
        headers: {
         authorization: auth.token,
        },
      });
  
      // Check if the request was successful
      if (response.data.success) {
        // Update the context to trigger a re-render of components dependent on cart data
        updateCart(true);
        setShowModal(false);
        toast.success('Product added to cart successfully!');
      } else {
        // Handle the case where the request was not successful
        toast.error('Failed to add product to cart. Please try again.');
      }
    } catch (error) {
      // Handle any errors that occurred during the axios request
      console.error('Error adding product to cart:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };
  

  return (
    <Layout>
      <div className='addash2' style={{ color: 'black', gap: '2rem', backgroundColor: 'transparent', boxShadow: 'none', textAlign: 'center' }}>
        {productDetails.length !== 0 ? (
          <>
            {productDetails.photo && (
              <img style={{ width: '40vw', margin: 'auto' }} src={`/${productDetails.photo.filename}`} alt={productDetails.name} />
            )}
            <div>
              <h1 style={{ border: '1px solid black', borderRadius: '1rem', padding: '0.5rem', textAlign: 'center' }}>{productDetails.name}</h1>
              <h2> {productDetails.description}</h2>
              <h3>${productDetails.price}</h3>
              <div style={{ display: 'flex', flexFlow: 'row', gap: '4vw', width: '100%', justifyContent: 'center' }}>
                {auth.user !== null ? (
                  <button
                    type='button'
                    onClick={() => setShowModal(true)}
                    style={{ width: 'fit-content', position: 'relative', left: '-4vw' }}
                    className='btn btn-info'
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button type='button' disabled style={{ width: 'fit-content', position: 'relative', left: '-4vw' }} className='btn btn-info'>
                    Add to Cart
                  </button>
                )}
                <button type='button' style={{ width: 'fit-content' }} className='btn btn-primary'>
                  Buy
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}

        {/* Modal for Add to Cart */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{productDetails.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor='quantity'>Quantity:</label>
            <input
              type='number'
              id='quantity'
              name='quantity'
              min='1'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant='primary' onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
}

export default ProductDetails;
