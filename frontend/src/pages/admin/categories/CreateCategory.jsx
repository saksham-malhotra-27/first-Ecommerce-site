import React, { useState } from 'react'
import Layout from '../../../components/Layout/Layout.jsx'
import slugify from 'slugify';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../../context/auth.jsx';
import { useNavigate } from 'react-router-dom';
function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example: Post category data to your API endpoint
      const response = await axios.post(
        'http://localhost:5000/api/v1/category/create-category',
        {
          name: categoryName,
          slug: slugify(categoryName),
        },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if(response.data.success){
        navigate("/dashboard/admin/edit-categories");
        setTimeout(()=>{
         toast.success(response.data.message);
        }, 3000)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (err) {
      toast.error(err || response.data.message)
      console.error('Error creating category:', err);
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        style={{
          textAlign: 'center',
          display: 'flex',
          flexFlow: 'column',
          border: '2px solid black',
          borderRadius: '2rem',
          padding: '2rem',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          boxShadow: '2px 2px 16px black',
        }}
      >
        <h1 style={{ color: 'pink', textShadow: '1px 1px 2px orange' }}>Create Category</h1>
        <div className='form-group' style={{ width: '30vw', height: '30vh', display: 'flex', flexFlow: 'column', justifyContent: 'space-evenly' }}>
          <input
            type='text'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            placeholder='Enter Category Name'
            className='form-text text-muted'
          />
          <button type='submit' style={{ width: '7vw', minWidth: '83.44px' }} className='btn btn-primary'>
            Create
          </button>
          </div>
      </form>
    </Layout>
  );
}


export default CreateCategory

/*

router.post('/create-category', requireSignIn, isAdmin, createCategoryController)


router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController )
//can do it like only '/' in the below one 
router.get('/categories', categoryController);

router.get(`/:slug`, singleCategoryController);

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

*/