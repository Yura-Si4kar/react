import React from 'react';
import './styles/main.css';
import NavBar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Projects from './pages/Projects';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import ProjectPage from './pages/ProjectPage';
import ScrollToTop from './utils/scrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <NavBar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/projects' element={<Projects />} />
          <Route path='/project/:id' element={<ProjectPage />} />
          <Route path='/contacts' element={<Contacts/>}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}