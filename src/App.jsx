import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import { ThemeProvider } from './components/contexts/ThemeContext'
import Product from './components/Product'
import Login from './components/admin/Login'
import AdminDashboard from './components/admin/AdminDashboard';
import { AdminRequireAuth } from './components/admin/AdminRequireAuth';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

import ShowCategory from './components/admin/category/ShowCategory';
import CreateCategory from './components/admin/category/CreateCategory';
import EditCategory from './components/admin/category/EditCategory';

import ShowBrand from './components/admin/brand/ShowBrand';
import CreateBrand from './components/admin/brand/CreateBrand';
import EditBrand from './components/admin/brand/EditBrand';

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
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ThemeProvider>  
    </>
  )
}

export default App
