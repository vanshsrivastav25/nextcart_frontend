import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import { ThemeProvider } from './components/contexts/ThemeContext'

function App() {

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
