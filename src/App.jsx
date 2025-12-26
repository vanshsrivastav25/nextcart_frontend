import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './components/contexts/ThemeContext'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth';
import { RequireAuth } from './components/RequireAuth';

import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart';
import Checkout from './components/Checkout';

import Login from './components/admin/Login'
import AdminDashboard from './components/admin/AdminDashboard';

import UserLogin from './components/user/UserLogin';
import UserRegister from './components/user/UserRegister';
import OTPVerification from './components/user/OTPVerification';
import UserProfile from './components/user/UserProfile';

import ShowCategory from './components/admin/category/ShowCategory';
import CreateCategory from './components/admin/category/CreateCategory';
import EditCategory from './components/admin/category/EditCategory';

import ShowBrand from './components/admin/brand/ShowBrand';
import CreateBrand from './components/admin/brand/CreateBrand';
import EditBrand from './components/admin/brand/EditBrand';

import ShowProduct from './components/admin/product/ShowProduct';
import CreateProduct from './components/admin/product/CreateProduct';
import EditProduct from './components/admin/product/EditProduct';

function App() {

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/product' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />

            {/* User Account Routes */}
            <Route path='/account/register' element={<UserRegister />} />
            <Route path='/account/login' element={<UserLogin />} />
            <Route path="/account/verify-otp" element={<OTPVerification />} />

             <Route path='/account/profile' element={
              <RequireAuth>
                <UserProfile />
              </RequireAuth>
            }/>

            {/* Admin  Routes */}
            <Route path='/admin/login' element={<Login />} />

            <Route path='/admin/dashboard' element={
              <AdminRequireAuth>
                <AdminDashboard />
              </AdminRequireAuth>
            }/>

            {/* Admin Categories Routes */}
            <Route path='/admin/categories' element={
              <AdminRequireAuth>
                <ShowCategory />
              </AdminRequireAuth>
            }/>

            <Route path='/admin/categories/create' element={
              <AdminRequireAuth>
                <CreateCategory />
              </AdminRequireAuth>
            }/>

            <Route path='/admin/categories/edit/:id' element={
              <AdminRequireAuth>
                <EditCategory />
              </AdminRequireAuth>
            }/>

            {/* Admin Brands Routes */}
            <Route path='/admin/brands' element={
              <AdminRequireAuth>
                <ShowBrand />
              </AdminRequireAuth>
            }/>

            <Route path='/admin/brands/create' element={
              <AdminRequireAuth>
                <CreateBrand />
              </AdminRequireAuth>
            }/>

            <Route path='/admin/brands/edit/:id' element={
              <AdminRequireAuth>
                <EditBrand />
              </AdminRequireAuth>
            }/>

            {/* Admin Products Routes */}
            <Route path='/admin/products' element={
              <AdminRequireAuth>
                <ShowProduct />
              </AdminRequireAuth>
            }/>

            <Route path='/admin/products/create' element={
              <AdminRequireAuth>
                <CreateProduct />
              </AdminRequireAuth>
            }/>

            <Route path='/admin/products/edit/:id' element={
              <AdminRequireAuth>
                <EditProduct />
              </AdminRequireAuth>
            }/>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ThemeProvider>  
    </>
  )
}

export default App
