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
import './assets/css/login.scss'

import { AdminAuthProvider } from './components/context/AdminAuth.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <App />
    </AdminAuthProvider>
  </StrictMode>,
)
