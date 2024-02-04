import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth.jsx'
import axios from 'axios'
import Spinner from '../Spinner.jsx';


function AdminRoute() {
    const [o, setOk]  = useState(false);
    const [auth, setAuth] = useAuth();
   useEffect(
    ()=>{
    const admin = async ()=>{
      try{
        const isadmin = await axios.get('http://localhost:5000/api/v1/auth/admin-auth', {
        headers:{
          "authorization": auth?.token 
      }
        })
        
        if(isadmin.data.ok ){
          console.log(isadmin)
          //yes its admin 
          setOk(true);
    
        }
      }catch(err){
        console.log(err); 
      }
   
  }
  if (auth?.token) admin();
   } , [auth?.token]
)

useEffect(()=>{
  console.log(o)
}, [o])

return o ? <Outlet/>:<Spinner p="/" a='true' /> 
  
}

export default AdminRoute