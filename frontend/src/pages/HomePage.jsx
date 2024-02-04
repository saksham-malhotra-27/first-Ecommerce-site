import Layout from "../components/Layout/Layout.jsx";
import { useAuth } from "../context/auth.jsx";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import slugify from 'slugify';
import { NavLink } from 'react-router-dom';

function HomePage() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const referenceForCartItems = useRef(0);
   if(performance.navigation.type===1){
    referenceForCartItems.current=0;
   }
  useEffect(() => {
    const fetchProducts = async () => {
        try {
        if (auth.user) {
          const cartProductInfo = await axios.get('http://localhost:5000/api/v1/cart/show', {
            headers: {
              authorization: auth.token
            }
          });

         // console.log('Cart Product Info:', cartProductInfo.data);

          // Check if 'fetchingCart' exists in the response
          if (cartProductInfo.data && cartProductInfo.data.fetchingCart) {
            
            const cartProductNames = cartProductInfo.data.fetchingCart.cart.map(item => item.product_name.toLowerCase());

            // Create an array of promises for fetching each product

            const productPromises = cartProductNames.map(async (productName) => {
              try {
                const response = await axios.get(`http://localhost:5000/api/v1/products/${slugify(productName)}`);
                const productData = response.data.product;
                return productData;
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
          
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Something unexpected happened');
      }
    
    };
    if(referenceForCartItems.current===0)
      {fetchProducts(); referenceForCartItems.current=1;}
      
    
  }, []);

 
  useEffect(() => {
    const fetchProducts = async () => {
        try {
        if (auth.user) {
          const cartProductInfo = await axios.get('http://localhost:5000/api/v1/cart/show', {
            headers: {
              authorization: auth.token
            }
          });

         // console.log('Cart Product Info:', cartProductInfo.data);

          // Check if 'fetchingCart' exists in the response
          if (cartProductInfo.data && cartProductInfo.data.fetchingCart) {
            
            const cartProductNames = cartProductInfo.data.fetchingCart.cart.map(item => item.product_name.toLowerCase());

            // Create an array of promises for fetching each product

            const productPromises = cartProductNames.map(async (productName) => {
              try {
                const response = await axios.get(`http://localhost:5000/api/v1/products/${slugify(productName)}`);
                const productData = response.data.product;
                return productData;
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
          
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Something unexpected happened');
      }
    
    };
      if(referenceForCartItems.current===0)
      {fetchProducts(); referenceForCartItems.current=1;}
      
    
  }, [auth]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/category/categories');
        if (response.status === 200) {
          setCats(response.data.categories);
        } else {
          toast.error('Something is wrong, check connection');
        }
      } catch (err) {
        toast.error('Something is wrong, check connection');
      }
    };

    fetchData();
  }, []);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <Layout title="Home" description="This is homepage" keywords='home,ecommerce' author="Saksham">
        <div style={{ display: "flex", flexDirection: "column", gap: "20vh" }}>
          <h1 style={{ color:"black", textShadow:"1px 1px 8px white",fontSize: "12vw", border: "4px solid #212529", textAlign: "center", padding: "10px", overflow: "clip", 
                      backgroundImage:"url(https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"}}>Welcome To JEWELS</h1>
          
          {auth && auth.user ? (
  <div style={{display:"flex", flexDirection:"column"}}>
    <h1>Your Cart:</h1>
    <div style={{  display:"flex", flexDirection:"column", gap:"2vh", padding:"10px" }}>
      {products && products.length > 0 ? (
        products.slice(0, 2).map((product) => (
          <NavLink key={product._id} to={`/product/${slugify(product.name.toLowerCase())}`} style={{ textDecoration: 'none', color: 'white', textShadow:"2px 2px 4px black" }}>
          <div style={{ display: 'flex', borderTop: '1px solid white',backgroundImage:"url(https://images.unsplash.com/photo-1635315619556-5826839a1bea?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", borderBottom: '1px solid white', gap: '3rem', flexFlow: 'row' }}>
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
    <NavLink style={{textDecoration:"none"}} to="/dashboard/cart">more...</NavLink>
  </div>
) : (
  <div></div>
)}
       
        <div>
        <h1 style={{color:"black", textShadow:"2px 2px 4px white"}}>
          We have many categories ! to watch and have from !! 
        </h1>
        <div style={{display:"flex", flexFlow:"column"}}>
        {cats.map((category) => (
                      <h1 key={category._id}>
                        <img height="30px" src="https://www.svgrepo.com/show/417834/marking.svg" alt="" />
                      <NavLink
                        key={category._id}
                        className="catnav"
                        to={`/category/${slugify(category.name)}`}
                        >
                        {capitalizeFirstLetter(category.name)}
                      </NavLink>
                        </h1> 

                    ))}
        </div>
        </div>
        </div>
      </Layout>
    </>
  );
}

export default HomePage;
