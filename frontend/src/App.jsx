import React from 'react'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Navbar'
import {Route, Routes} from 'react-router-dom';
import Footer from './components/Footer.jsx';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';

const App = () => {
  return (
    <div>
        <Navbar/>

        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>

        <Footer/>
    </div>
  )
}

export default App