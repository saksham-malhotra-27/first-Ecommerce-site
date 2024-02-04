import './App.css'
import HomePage from "./pages/HomePage.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Policy from "./pages/Policy.jsx"
import Pagenotfound from "./pages/Pagenotfound.jsx"
import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import { Routes , Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard.jsx'
import PrivateRoute from './components/Routes/private.jsx'
import AdminRoute from './components/Routes/Admin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import UpdateCategory from './pages/admin/categories/UpdateCategory.jsx'
import CreateCategory from './pages/admin/categories/CreateCategory.jsx'
import DeleteCategory from './pages/admin/categories/DeleteCategory.jsx'
import EditCategory from './pages/admin/categories/EditCategory.jsx'
import Users from './pages/admin/Users.jsx'
import Orders from './pages/user/Orders.jsx'
import EditProducts from './pages/admin/products/EditProducts.jsx'
import DeleteProduct from './pages/admin/products/DeleteProduct.jsx'
import CreateProduct from './pages/admin/products/CreateProduct.jsx'
import UpdateProduct from './pages/admin/products/UpdateProduct.jsx'
import ProductDetails from './pages/all/ProductDetails.jsx'
import CategoryDetails from './pages/all/CategoryDetails.jsx'
import Cart from './pages/all/Cart.jsx'
function App() {


  return (
    <>
    <Routes>
          <Route
          path='/' element={<HomePage/>}/>
          <Route
          path='/about' element={<About/>}/>
          <Route
          path='/contact' element={<Contact/>}/>
          <Route
          path='/policy' element={<Policy/>}/>
          <Route
          path='/register' element={<Register/>}/>
          <Route
          path='/*' element={<Pagenotfound/>}/>
          <Route
          path='/login' element={<Login/>}/>
          <Route path="/product/:productName" element={<ProductDetails/>} />
          <Route path="/category/:catName" element={<CategoryDetails/>}/>
          <Route 
          path='/dashboard' element={<PrivateRoute/>}>
              <Route 
              path='user' element={<Dashboard/>}/>
              <Route 
              path='cart' element={<Cart/>}/>
               <Route 
              path='' element={<Pagenotfound/>}/>
              <Route 
              path='user/orders' element={<Orders/>}/>
          </Route>
          <Route 
          path='/dashboard' element={<AdminRoute/>}>
              <Route 
              path='admin' element={<AdminDashboard/>}/>
               <Route 
              path='' element={<Pagenotfound/>}/>
              <Route 
              path='admin/edit-categories/' element={<EditCategory/>}/>
              <Route 
              path='admin/edit-categories/create-category' element={<CreateCategory/>}/>
              <Route 
              path='admin/edit-categories/update-category' element={<UpdateCategory/>}/>
              <Route 
              path='admin/edit-categories/delete-category' element={<DeleteCategory/>}/>
               <Route 
               path = 'admin/edit-products' element = {<EditProducts/>}/>
               <Route 
              path='admin/users' element={<Users/>}/>
              <Route 
              path='admin/edit-products/delete-product' element = {<DeleteProduct/>}/>
              <Route 
              path='admin/edit-products/create-product' element = {<CreateProduct/>}/>
              <Route 
              path='admin/edit-products/update-product' element = {<UpdateProduct/>}/>
          </Route>

          
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
