import React from 'react'
import { NavLink } from 'react-router-dom'
function Footer() {
  return ( 
    <div className='d-flex' style={{backgroundColor:'#000000'}} >
      <div id='footerlinks'>
        <div style={{ minHeight:"4rem",display:"flex", flexFlow:'column', gap:"0.3rem", padding:"0.4rem",   color:"white" }}>
          <h1>About Us</h1>
          <NavLink to="/about" style={{color:"aqua"}} >
           Click here to 
          </NavLink>
          
        </div>
        <div style={{ minHeight:"4rem",display:"flex",flexFlow:'column', gap:"0.3rem", padding:"0.4rem",  color:"white" }}>
        <h1>Contact Us</h1>
          <NavLink to="/contact" style={{color:"aqua"}}>
            Click here
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Footer