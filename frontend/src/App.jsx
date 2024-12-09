import React from 'react'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Navbar'
import {Route, Routes} from 'react-router-dom';
import Footer from './components/Footer.jsx';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import DiagnosisPage from './pages/Diagnose';
import ExercisePage from './pages/ExercisePage';
import ChatbotPage from './pages/ChatBotPage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
        <Navbar/>

        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/diagnose' element={<DiagnosisPage/>}/>
          <Route path='/exercise' element={<ExercisePage/>}/>
          <Route path='/exercise/:id' element={<ChatbotPage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>

        <Footer/>
        <ToastContainer/>
    </div>
  )
}

export default App