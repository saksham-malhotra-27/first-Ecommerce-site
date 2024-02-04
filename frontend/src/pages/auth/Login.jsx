import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/auth';

function Login() {
  const [auth,setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
 const location = useLocation()
  const sub = async (e)=>{
    e.preventDefault();
    try{
       const res = await axios.post('http://localhost:5000/api/v1/auth/login', {
        email, password 
       });
       if(res.data.success){
        toast.success(res.data.message);
        if(auth.user !==null){
          localStorage.clear();
        }
        setAuth({
          ...auth,
           user: res.data.user, 
           token:res.data.token
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        // console.log(location.state)
        navigate(location.state ||"/");
        setTimeout(()=>{
          toast.success(`Welcome ${res.data.user.name}`);
        }, 3000)
       }
       else{
        toast.error("Credentials are wrong");
       }
    }
    catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage = err.response.data.message || "An error occurred on the server.";
        toast.error(errorMessage);
      } else if (err.request) {
        // The request was made but no response was received
        toast.error("Request failed, please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An unexpected error occurred.");
      }
    }
    
  }

  
  return (
    <Layout>
     <form onSubmit={sub} style={{textAlign:'center' ,display:'flex', flexFlow:"column", border:"2px solid black", borderRadius:"2rem", padding:'2rem', backgroundColor:"rgb(0,0,0,0.5)", boxShadow:"2px 2px 16px black"}} >
            <h1 style={{color:"pink", textShadow:"1px 1px 2px orange"}}>Login Now</h1>
            <div className='form-group'  style={{width:"30vw",height:"30vh", display:"flex", flexFlow:"column", justifyContent:"space-evenly"}}>
             <input type='email'    value={email} onChange={(e)=>{setEmail(e.target.value)}} required placeholder="Enter Email" className='form-text text-muted'/>
             <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required placeholder="Enter Password" className='form-text text-muted'/>
             <button type="submit"  style={{width:"7vw", minWidth:"83.44px"}}  className="btn btn-primary">Submit</button>
            </div>
      </form>
    </Layout>
      
  )
}

export default Login