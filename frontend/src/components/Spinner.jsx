import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Spinner( props ) {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const interval = setInterval(()=>{
          setCount((prevCount) => prevCount - 1); // Correct invocation of setCount
        }, 1000)
        //  console.log(count)
        return () => {
          clearInterval(interval);
        };
      }, [count]);

      useEffect(() => {
        if (count === 0) {
          if(props.a==='true'){
            const it = setInterval(() => {
              toast.error("Logout first");
              clearInterval(it)
            }, 3000);
            navigate('/')
          }
          else if(!location.state){
            navigate('/login', {
              
              state : props.p
            });
          }
           // console.log(location.state)
        }
      }, [count, navigate, location]);
    

  return (
    <>
    <div style={{height:"100vh", backgroundImage:"url(../../../public/main.svg)"}}className="d-flex flex-column justify-content-center align-items-center">
        <h1 className='text-center'>Redirecting in {count}</h1>
      <div className="spinner-border" role="status">
      </div>
        <span className="sr-only">Loading...</span>
    </div>
    </>
  )
}

export default Spinner