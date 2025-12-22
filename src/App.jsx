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

function App() {

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/product' element={<Product />} />

            <Route path='/admin/login' element={<Login />} />

            <Route path='/admin/dashboard' element={
              <AdminRequireAuth>
                <AdminDashboard />
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
