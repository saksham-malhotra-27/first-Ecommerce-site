import React from 'react'
import { NavLink } from 'react-router-dom'
import Layout from '../../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// ... (your imports)

function EditCategory() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true)
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
        const response = await axios.get("http://localhost:5000/api/v1/category/categories");
        if (response.status === 200) {
          setCats(response.data.categories); 
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

        <div className='d-flex row ' style={{ backgroundColor:" rgba(0, 0, 0, 0.3)",height:"10rem"}}>
          <NavLink to='create-category' style={{ display: 'flex', overflow: "auto", justifyContent: "center", alignItems: "center", borderBottom: ".2px solid whitesmoke", color: "blanchedalmond", textDecoration: "none", textAlign: "center" }}>
            <h5>Create Category</h5>
          </NavLink>
          <NavLink to='update-category' style={{ display: 'flex', overflow: "auto", justifyContent: "center", alignItems: "center", borderBottom: ".2px solid whitesmoke", color: "blanchedalmond", textDecoration: "none", textAlign: "center" }}>
            <h5>Update Category</h5>
          </NavLink>
          <NavLink to='delete-category' style={{ display: 'flex', overflow: "auto", justifyContent: "center", alignItems: "center", color: "blanchedalmond", textDecoration: "none", textAlign: "center" }}>
            <h5>Delete Category</h5>
          </NavLink>
        </div>
 
        <div className='d-flex row gap-5'>
          {cats.map(category => (
            <div key={category._id} className='category-item'>
              <h5>{category.name}</h5>
              <div >
                <h6>{category._id}</h6>
                <button className='btn btn-info' onClick={() => handleCopyClick(category._id)}>Copy</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default EditCategory;
