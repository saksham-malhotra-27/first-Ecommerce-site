import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () =>{
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
     e.preventDefault();
     try{
            const res = await axios.post(`http://localhost:5000/api/v1/auth/register`, {
              name,
              email,
              password,
              phone,
              address
            });
          
            if (res.data.success) {
              toast.success(res.data.message);
              navigate('/login');
            }
            else{
                toast.error(res.data.message);
            }
         
    }
     catch(error){
        console.log(error);
        toast.error('Something went wrong')
     }
    }

    return(
        <Layout>
           <form  onSubmit={handleSubmit} style={{textAlign:'center', display:'flex', flexFlow:"column", border:"2px solid black", borderRadius:"2rem", padding:'2rem', backgroundColor:"rgb(0,0,0,0.5)", boxShadow:"2px 2px 16px black"}} >
            <h1 style={{textShadow:'1px 1px 2px orange' , color:'pink'}}>Register Now</h1>
            <div className='form-group'  style={{width:"40vw",height:"50vh", display:"flex", flexFlow:"column", justifyContent:"space-evenly"}}>
             <input type='text'      value={name} onChange={(e)=>{setName(e.target.value)}} required placeholder="Enter Name" className='form-text text-muted'/>
             <input type='email'     value={email} onChange={(e)=>{setEmail(e.target.value)}} required placeholder="Enter Email" className='form-text text-muted'/>
             <input type='password'  value={password} onChange={(e)=>{setPassword(e.target.value)}} required placeholder="Enter Password" className='form-text text-muted'/>
             <input type='text'      value={phone} onChange={(e)=>{setPhone(e.target.value)}} required placeholder="Enter Phone" className='form-text text-muted'/>
             <input type='text'      value={address} onChange={(e)=>{setAddress(e.target.value)}} required placeholder="Enter Address" className='form-text text-muted'/>
             <button type="submit"   style={{width:"7vw", minWidth:"83.44px"}}  className="btn btn-primary" >Submit</button>
            </div>
           </form>
        </Layout>
    )
}

export default Register;