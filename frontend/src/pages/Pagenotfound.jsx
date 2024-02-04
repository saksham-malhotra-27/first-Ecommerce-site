import React from 'react'
import Layout from '../components/Layout/Layout.jsx'

function Pagenotfound() {
  return (
    <Layout title="Error 404" description="This is homepage" keywords="404" author="Saksham">
      <div style={{textAlign:"center"}}>
        <h1>404</h1>
        <h2>Error</h2>
        <h3>Page Not Found</h3>
      </div>
         
    </Layout>
   
  )
}

export default Pagenotfound