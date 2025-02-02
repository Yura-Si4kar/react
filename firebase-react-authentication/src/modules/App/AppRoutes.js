import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Regidter/Register'
import User from '../User/User'
import ErrorPage from '../error-page'
// import App from '../App/App';

export default function AppRoutes() {
  return (
      <BrowserRouter>
        <Routes>
              <Route path='/' element={<Navigate to='/login' />} errorElement={<ErrorPage/>} /> 
             <Route path='/login' element={<Login/>}/> 
             <Route path='/register' element={<Register/>}/> 
             <Route path='/user' element={<User/>}/> 
        </Routes>
      </BrowserRouter>
  )
}
