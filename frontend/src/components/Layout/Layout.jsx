import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Layout({children, title, description,keywords ,author }) {
 
  return (
    <>
    <HelmetProvider>
    <Helmet>
      <meta charSet = "utf-8"/>
      <meta name='description' content={description}/>
      <meta name='author' content={author}/>
      <meta name='keywords' content={keywords}/>
      <title>{title}</title>
    </Helmet>
    </HelmetProvider>
    
    <Header/>
      <main  id='bgsvg' style={{ minHeight:'140vh',height:"auto",padding:'2rem', display:'flex' , alignItems:'start', justifyContent:'center'}}>
        {children}
      </main>
    <Footer/>
    </>
  )
}

export default Layout