import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout.jsx';
import axios from 'axios';
import { useAuth } from '../../context/auth.jsx';

function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Make the request with the token in the Authorization header
        const response = await axios.get('http://localhost:5000/api/v1/users', {
          headers:{
            authorization: auth.token
          }
        });

        setAllUsers(response.data.Users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  


  return (
    <Layout>
      <div style={{ width:"80vw",height:"100%" , padding:"0", margin:"0"}}>
        <h1 style={{textAlign:"center", textShadow:"1px 1px 2px rgba(0, 0, 0, 0.2)"}}>Users</h1>
        <ul className='user-list' style={{ padding:"0", margin:"0"}} >
          {allUsers.map((user) => (
            <li key={user._id} className='user-item' style={{ padding:"4px", margin:"3px"}}>
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email} <br />
              <strong>Phone:</strong> {user.phone} <br />
              <details>
              <strong>Address:</strong> {user.address} <br />
              <strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()} <br />
              <strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()} <br />
              </details>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Users;