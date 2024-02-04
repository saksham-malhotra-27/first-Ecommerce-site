import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import slugify from 'slugify';
import { useAppContext } from '../../context/cartContext.jsx';


function Header() {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inv, setInv] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartUpdated, updateCart] = useAppContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/products/products/woimage');
        setProducts(response.data.products);
      } catch (err) {
        toast.error('Cannot display options, internal server issue');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter products based on the searchTerm
    if (searchTerm === '') {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

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

  //for updating cart
  useEffect(() => {
    const fetchCart = async () => {
      if(auth.user){
        if (auth.user.cart ) {
        if(cartUpdated){
        try {
          const cartResponse = await axios.get('http://localhost:5000/api/v1/cart/show', {
            headers: {
              authorization: auth.token,
            },
          });

          setCartItems(cartResponse.data.fetchingCart.cart);
        } catch (error) {
          console.error('Error fetching cart:', error);
          toast.error('Failed to fetch cart information');
        }}
      } else {
        setCartItems([])
      }
    }
    };

    fetchCart();
    if(auth && cartUpdated){
      updateCart(false);
    }
  }, [cartUpdated]);
   
 
  useEffect(()=>{
    const fetchCart = async () => {
      if(auth.user){
        if (auth.user.cart ) {
          try {
            const cartResponse = await axios.get('http://localhost:5000/api/v1/cart/show', {
              headers: {
                authorization: auth.token,
              },
            });
  
            setCartItems(cartResponse.data.fetchingCart.cart);
          } catch (error) {
            console.error('Error fetching cart:', error);
            toast.error('Failed to fetch cart information');
          }
        } else {
          setCartItems([])
        }
      }
      
    };

    fetchCart();
  }, [])


  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: '#F4DFC8',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand ">
          <img style={{height:"40px"}} src='jewel.svg'/>  
            JEWELS
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <div
                  onClick={() => {
                    setInv(inv ? false : true);
                  }}
                  className="nav-link"
                >
                  Category
                  <div
                    onMouseEnter={(e) => {
                      e.stopPropagation(); // Prevent the event from reaching the parent
                    }}
                    style={{
                      borderBottomRightRadius: '5px',
                      borderBottomLeftRadius: '5px',
                      display: inv ? 'none' : 'flex',
                      width: '200px',
                      flexFlow: 'column',
                      gap: '5px',
                      position: 'absolute',
                      top: '3.5rem',
                      backgroundColor: 'rgb(244,223,200)',
                      padding: '0.5rem',
                    }}
                  >
                    {cats.map((category) => (
                      <NavLink
                        key={category._id}
                        className="catnav"
                        to={`/category/${slugify(category.name)}`}
                      >
                        {capitalizeFirstLetter(category.name)}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </li>

              {auth && auth.user === null ? (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Log/Signup
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/register">
                        Signup
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item " style={{ display: 'flex', alignItems: 'center' }}>
                    <NavLink className="nav-link" to="/dashboard/cart">
                      Cart ({cartItems.length})
                    </NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink className="nav-link" to={`/dashboard/${auth.user && auth.user.role == 1 ? 'admin' : 'user'}`}>
                        Dashboard</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      role="button"
                      onClick={() => {
                        setAuth(null);
                        localStorage.clear();
                        window.location.reload();
                        navigate('/');
                      }}
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <form
              className="d-flex nav-item"
              style={{ position: 'relative' }}
              role="search"
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredProducts && (
                <div
                  className="search-results"
                  style={{
                    position: 'absolute',
                    top: '3rem',
                    backgroundColor: 'rgb(244,223,200)',
                    width: '100%',
                    marginTop: '-0.5rem',
                    padding: '3px',
                    borderBottomLeftRadius: '5px',
                    borderBottomRightRadius: '5px',
                  }}
                >
                  {filteredProducts.map((product) => (
                    <NavLink
                      key={product._id}
                      to={`/product/${product.name}`}
                      onClick={() => {
                        if (window.location.pathname.includes('/product')) {
                          window.location.reload();
                          window.location.href = `/product/${product.name}`;
                        }
                      }}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <div>{product.name}</div>
                    </NavLink>
                  ))}
                </div>
              )}
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
