import React from 'react'
import Layout from '../components/Layout/Layout.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Contact() {
  return (
    <Layout title="Contact Us" description="This is homepage" keywords='contact' author="Saksham">
        <div style={{display:"flex", justifyContent:"center", gap: '3vw', width:'100vw', minHeight:'50vh', margin:"2vw "}}>
          
        <div style={{display:"flex", flexFlow:'column', gap: '3vh', width:'auto', borderRadius: '2rem', minHeight:'50vh',maxHeight:'120vh', overflow:"auto", padding:'1em', border:'1px solid black', boxShadow: '2px 2px 16px black', backgroundColor:"rgb(0,0,0,0.4)", color:"white"}}>
          <h1 style={{textAlign:'center',textShadow:'1px 1px 2px orange' }}>
            Contact Us Here
          </h1>
          <h2 style={{textAlign:'center', color:"pink", textShadow:'1px 1px 2px orange'}}>
            You can contact us from following
          </h2>
          <h4>Phone Number:</h4>
          <div style={{display:'inline-flex ', justifyContent:"space-between"}}>
          <p>
          9********8
          </p>
          <button className='btn btn-info' 
          onClick={() => {
            navigator.clipboard.writeText('9********8')
            .then(() => {
              toast.success("Phone copied to clipboard");
            })
            .catch((err) => {
              console.error("Copy failed:", err);
              toast.error("Copy failed. Please try again.");
            });
             }}>
                  Copy
          </button>
          </div>
          <h4>
            Email:
          </h4>
          <div style={{display:'inline-flex ', justifyContent:"space-between"}}>
          <p>
          e*******h@gmail.com 
          </p>
          <button className='btn btn-info' 
          onClick={() =>{
           navigator.clipboard.writeText('e*******h@gmail.com ')
           .then(() => {
            toast.success("Email copied to clipboard");
          })
          .catch((err) => {
            console.error("Copy failed:", err);
            toast.error("Copy failed. Please try again.");
          });
           }}>
                  Copy
          </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact