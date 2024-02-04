import React from 'react'
import Layout from '../../components/Layout/Layout.jsx'
import { useAuth } from '../../context/auth.jsx'
import { NavLink } from 'react-router-dom';
function AdminDashboard() {
  const [auth, setAuth] = useAuth();

  return (
    
    <Layout>
    <div className=' gap-5 addash'>
      
    
      
      <div className='d-flex row' style={{overflow:"auto", width:"fit-content"}}>
      <h1 style={{ height:"auto", width:"100%", textAlign:"left"}}>
       Name:  {`${auth.user.name}`}</h1>
      <h1 style={{height:"auto", width:"100%", textAlign:"left"}}>
       EMail: {`${auth.user.email}`}</h1>
      <h1 style={{height:"auto", width:"100%", textAlign:"left"}}>
       Address:  {`${auth.user.address}`}</h1>
      <h1 style={{height:"auto", width:"100%", textAlign:"left"}}>
       Phone:  {`${auth.user.phone}`}</h1>
      </div>
      
      <div className='d-flex row' >
          
          <NavLink as="button" to='edit-categories' style={{display:'flex', overflow:"auto", justifyContent:"center", alignItems:"center", borderBottom:".2px solid whitesmoke" ,color:"blanchedalmond",textDecoration:"none", textAlign:"center"}} >
          <h5>
          Edit Categories
          </h5> 
          </NavLink>
          <NavLink to='edit-products' style={{display:'flex', overflow:"auto", justifyContent:"center", alignItems:"center", borderBottom:".2px solid whitesmoke" ,color:"blanchedalmond",textDecoration:"none", textAlign:"center"}}>
         
         <h5>
         Edit Products
         </h5> 
          </NavLink>
          <NavLink to='users' style={{display:'flex', overflow:"auto", justifyContent:"center", alignItems:"center", color:"blanchedalmond",textDecoration:"none", textAlign:"center"}}>
          <h5>
          Users
          </h5>
          </NavLink>
      </div>
    
    </div>
    </Layout>

  )
}

export default AdminDashboard