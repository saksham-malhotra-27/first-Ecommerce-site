import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function ProductsPage( catName ) {
  const [data, setData] = useState([]);

  useEffect(()=>{
    async function fetching (){

      try{
        const imp = await axios.get(`http://localhost:5000/api/v1/category/${catName}`)
        
        if(imp.data.success){
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

  return (
    <div>ProductsPage</div>
  )
}

export default ProductsPage