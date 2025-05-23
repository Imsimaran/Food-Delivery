import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import Login from './components/Login'
import Register from './components/Register'
import RestaurantCard from './components/RestaurantCard'
import AdminDashboard from './components/AdminDashboard'
import Profile from './components/Profile'
import AdminRestaurant from './components/AdminRestaurant'
import EditFoodItem from './components/EditFoodItem'
import AdminAddFood from './components/AdminAddFood'
import UserProfile from './components/UserProfile'
import Checkout from './components/Checkout'
import Order from './components/Order'
import AdminOrders from './components/AdminOrders'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  const appRouter=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/cart',
      element:<Cart/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/restaurant/:id',
      element:<RestaurantCard/>
    },
    {
      path:'/admin',
      element:<AdminDashboard/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },
    {
      path:'/admin/restaurant/:id',
      element:<AdminRestaurant/>
    },
    {
      path:'/admin/edit/:id',
      element:<EditFoodItem/>
    },
    {
      path:'/admin/add-food-item/:id',
      element:<AdminAddFood/>
    },
    {
      path:'/userProfile',
      element:<UserProfile/>
    },
    {
      path:'/checkout',
      element:<Checkout/>
    },
    {
      path:'/orders',
      element:<Order/>
    },
    {
      path:'/admin/orders/:id',
      element:<AdminOrders/>
    }
  ])
  return (
   <div>
    <RouterProvider router={appRouter}></RouterProvider>
    <ToastContainer/>
   </div>
  )
}

export default App
