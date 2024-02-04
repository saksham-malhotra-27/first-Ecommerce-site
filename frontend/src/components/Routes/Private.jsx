import { useState, useEffect } from "react";
import {useAuth} from "../../context/auth.jsx"
import Spinner from "../Spinner.jsx";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function PrivateRoute(){
    const [ok,setOk] = useState(false);
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth()
    const [adm, setAdm] = useState(0)
    useEffect(()=>{

         async function forauth() {

             try{
                const res = await axios.get("http://localhost:5000/api/v1/auth/user-auth", 
                {
                    headers:{
                        "authorization": auth?.token 
                    }
                }
                )
                if(res.data.role===1){

                    
                    const intervalId = setInterval(() => {
                        toast.error("Not a user, Please access admin dashboard");
                        clearInterval(intervalId); 
                    }, 3000);
                    
                    navigate('/dashboard/admin')
                }
                if(res.data.ok){
                    console.log(res.data)
                    setOk(true)
    
                }}
            catch(error){
                    console.log("Error occurred:", error);
                    setOk(false)
            }
            
        }
        const forforauth = async ()=>{
            if(auth?.token) {
                 await forauth()
                };
        }

        forforauth();

        }
        
        , [auth?.token])
    

    //console.log(ok)
    
    return ok ? <Outlet/> : <Spinner p="/dashboard/user"/>;
}


