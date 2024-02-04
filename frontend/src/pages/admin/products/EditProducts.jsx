import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';

function EditProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCopyClick = (id) => {
    navigator.clipboard.writeText(id)
      .then(() => {
        toast.success("ID copied to clipboard");
      })
      .catch((err) => {
        console.error("Copy failed:", err);
        toast.error("Copy failed. Please try again.");
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/products");
        if (response.status === 200) {
          setProducts(response.data.products); 
        } else {
          toast.error("Something is wrong, check connection");
        }
      } catch (err) {
        toast.error("Something is wrong, check connection");
      }
      finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if(loading){
    return (
      <Layout>
        Loading...
      </Layout>
    )
  }
  return (
    <Layout>
     <div className='gap-5 addash'>
     <div className='d-flex row ' style={{ backgroundColor:" rgba(0, 0, 0, 0.3)",height:"10rem", width:"20rem"}}>
          <NavLink to='create-product' style={{ display: 'flex', overflow: "auto", justifyContent: "center", alignItems: "center", borderBottom: ".2px solid whitesmoke", color: "blanchedalmond", textDecoration: "none", textAlign: "center" }}>
            <h5>Create Product</h5>
          </NavLink>
          <NavLink to='update-product' style={{ display: 'flex', overflow: "auto", justifyContent: "center", alignItems: "center", borderBottom: ".2px solid whitesmoke", color: "blanchedalmond", textDecoration: "none", textAlign: "center" }}>
            <h5>Update Product</h5>
          </NavLink>
          <NavLink to='delete-product' style={{ display: 'flex', overflow: "auto", justifyContent: "center", alignItems: "center", color: "blanchedalmond", textDecoration: "none", textAlign: "center" }}>
            <h5>Delete Product</h5>
          </NavLink>
        </div>
     <div className='d-flex row gap-5'>
          {products.map(product => (
            <div key={product._id} className='product-item'>
              {console.log(product.photo.filename)}
              <img style={{height: "10vh", width: "auto", borderRadius:"2px" }} src={"/"+ product.photo.filename} alt={product.name} />
              <h5>{product.name}</h5>
              <div>
                <h6>{product._id}</h6>
                <button className='btn btn-info' onClick={() => handleCopyClick(product._id)}>
                  Copy
                </button>
              </div>
              <details>
              <h6>Description: {product.description}</h6>
              <h6>Price: {product.price}</h6>
              <h6>Quantity: {product.quantity}</h6>
              <h6>Shipping: {product.shipping.toString()}</h6>
              </details>
              
            </div>
          ))}
     </div>
     </div>
    </Layout>
  )
}

export default EditProducts