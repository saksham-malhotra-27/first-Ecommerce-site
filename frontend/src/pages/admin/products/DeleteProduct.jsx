import React from 'react'
import { useAuth } from '../../../context/auth.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function DeleteProduct() {
    const [auth,setAuth] = useAuth();
    const [id, setId] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Example: Post category data to your API endpoint
          const response = await axios.delete(
            `http://localhost:5000/api/v1/products/delete-product/${id}`,
            {
              headers: {
                authorization: auth.token,
              },
            }
          );
          if(response.data.success){
            navigate("/dashboard/admin/edit-products");
            setTimeout(()=>{
              toast.success(response.data.message);
            }, 2000)
          }
          else{
            toast.error(response.data.message)
          }
        } catch (err) {
          console.error('Error deleting Product:', err);
          toast.error('An error occurred while deleting the Product. Please try again.');
        }
        
      };
    

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
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
        <h1 style={{ color: 'pink', textShadow: '1px 1px 2px orange' }}>Delete Product</h1>
        <div className='form-group' style={{ width: '30vw', height: '30vh', display: 'flex', flexFlow: 'column', justifyContent: 'space-evenly' }}>
          <input
            type='text'
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            placeholder='Enter Product id'
            className='form-text text-muted'
          />
          <button type='submit' style={{ width: '7vw', minWidth: '83.44px' }} className='btn btn-primary'>
            Delete
          </button>
          </div>
      </form>
    </Layout>
  );
}

export default DeleteProduct