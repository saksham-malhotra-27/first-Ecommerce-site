import React from 'react'
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import ProductsPage from './ProductsPage';
import { NavLink } from 'react-router-dom';
function CategoryDetails() {
    const { catName }= useParams();
    const [id, setId] = useState(0);
    const [products, setProducts] = useState([])
    useEffect(()=>{
      async function fetching (){
  
        try{
          const imp = await axios.get(`http://localhost:5000/api/v1/category/${catName}`)
          
          if(imp.data.success){
            console.log(imp.data.cat._id)
            setId(imp.data.cat._id)
          }
          else{
            toast.error(imp.data.message)
          }
        }
        catch(err){
            toast.error(err);
        }

      }
      fetching();
     
    },[])

    useEffect(()=>{
      async function fetchingProducts(){
        try{
          if(id!== 0){
          const imp = await axios.get(`http://localhost:5000/api/v1/products/products/${id}`)
          
          if(imp.data.success){
            setProducts(imp.data.products)
            console.log(products)
          }
          else{
            toast.error(imp.data.message)
          }
        }

        }
        catch(err){
          toast.error(err);
        }
      }
     fetchingProducts();

    },[id])

  return (
    <Layout>
   <div>
{products && products.length > 0 && (
  products.map(product => (
    <NavLink key={product._id} to={`/product/${product.name}`} style={{ textDecoration: "none", color: "white" }}>
      <div style={{ backgroundImage:"url(https://images.unsplash.com/photo-1635315619556-5826839a1bea?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",display:"flex" ,  borderTop:"1px solid white", borderBottom:"1px solid white", gap:"3rem", flexFlow:"row"}}>
        <div style={{padding:"1rem"}}> 
        <img src={`/${product.photo.filename}`} style={{width:"10rem"}}/>
        <h1>{product.name}</h1>
        <h2>${product.price}</h2>
        </div>
        <div>
        <p style={{textAlign:"center" ,position:'relative', top:"6rem"}}>{product.description}</p>
        </div>
      </div>
    </NavLink>
  ))
)}
</div>
    </Layout>
    
  )
}

export default CategoryDetails