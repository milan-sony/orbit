import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from '../pages/Index/Index'
import Home from '../pages/Home/Home'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import ProtectedRoute from '../utils/ProtectedRoute'
import { userAuthStore } from '../store/userAuthStore'

function Router() {
    const { isUserAuthenticated } = userAuthStore()
    console.log("isUserAuthenticated in router: ", isUserAuthenticated)

    return (
        <Routes>
            <Route path='/' element={isUserAuthenticated ? <Home /> : <Index />} />
            <Route path='/signup' element={isUserAuthenticated ? <Home /> : <Signup />} />
            <Route path='/login' element={isUserAuthenticated ? <Home /> : <Login />} />
            <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default Router
