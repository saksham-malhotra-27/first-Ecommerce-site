import React from 'react'
import Layout from '../../components/Layout/Layout.jsx'
import { useAuth } from '../../context/auth.jsx'
import { NavLink } from 'react-router-dom';
function AdminDashboard() {
  const [auth, setAuth] = useAuth();

  return (
    
    <Layout>
    <div className='d-flex col gap-5' style={{ overflow:"auto",color:"whitesmoke",padding:"1em",width:"auto", minHeight:"20rem", backgroundColor:"rgb(0,0,0,0.3)", borderRadius:"0.5rem", boxShadow:"2px 2px 16px black"}}>
      
      <div className='d-flex row'  >
        <img style={{aspectRatio:"1:1", width:"20rem", borderRadius:"3rem" }} src='https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
      </div>
      
      <div className='d-flex row' style={{overflow:"auto", width:"fit-content"}}>
      <h1 style={{ height:"auto", width:"100%", textAlign:"left"}}>
       Name: {`${auth.user.name}`}</h1>
      <h1 style={{height:"auto", width:"100%", textAlign:"left"}}>
       EMail:  {`${auth.user.email}`}</h1>
         <h1 style={{height:"auto", width:"100%", textAlign:"left"}}>
       Address: {`${auth.user.address}`}</h1>
      <h1 style={{height:"auto", width:"100%", textAlign:"left"}}>
       Phone: {`${auth.user.phone}`}</h1>
      </div>
      
      <div className='d-flex row' >
          
          <NavLink to='orders' style={{display:'flex', overflow:"auto", justifyContent:"center", alignItems:"center" ,color:"blanchedalmond",textDecoration:"none", textAlign:"center"}} >
          <h5>
          Your Orders
          </h5>          
          </NavLink>
      </div>
    
    </div>
    </Layout>

  )
}

export default AdminDashboard