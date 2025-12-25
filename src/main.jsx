import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import App from './App.jsx'

import './assets/css/style.scss'
import './assets/css/footer.scss'
import './assets/css/swiperslide.scss'
import './assets/css/latestproduct.scss'
import './assets/css/featuredproducts.scss'
import './assets/css/shop.scss'
import './assets/css/product.scss'
import './assets/css/cart.scss'
import './assets/css/checkout.scss'
import './assets/css/admindashboard.scss'
import './assets/css/adminsidebar.scss'
import './assets/css/showcategory.scss'
import './assets/css/createcategory.scss'
import './assets/css/createproduct.scss'
import './assets/css/editproduct.scss'

import './assets/css/loading.scss'
import './assets/css/login.scss'
import './assets/css/userlogin.scss'
import './assets/css/userregister.scss'
import './assets/css/usersidebar.scss'


import { AdminAuthProvider } from './components/contexts/AdminAuth.jsx';
import { AuthProvider } from './components/contexts/UserAuth.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AdminAuthProvider>
  </StrictMode>,
)
