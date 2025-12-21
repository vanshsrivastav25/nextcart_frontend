import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import { ThemeProvider } from './components/contexts/ThemeContext'

function App() {
  useEffect(() => {
    // Log environment for debugging
    console.log('Environment:', process.env.NODE_ENV);
    console.log('API URL:', process.env.REACT_APP_API_URL);
  }, []);

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='shop' element={<Shop />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>  
    </>
  )
}

export default App
