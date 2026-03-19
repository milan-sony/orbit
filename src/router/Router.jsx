import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Index from '../pages/Index/Index'
import Home from '../pages/Home/Home'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import ProtectedRoute from '../utils/ProtectedRoute'
import { userAuthStore } from '../store/userAuthStore'
import Profile from '../pages/Profile/Profile'
import Tasks from '../pages/Tasks/Tasks'
import Remainders from '../pages/Remainders/Remainders'
import Notes from '../pages/Notes/Notes'
import Layout from '../components/Layout'

function Router() {
    const { isUserAuthenticated } = userAuthStore()
    console.log("isUserAuthenticated in router: ", isUserAuthenticated)

    return (
        <Routes>
            <Route path='/' element={isUserAuthenticated ? <Navigate to="/home" /> : <Index />} />
            <Route element={<Layout />}>
                <Route path='/signup' element={isUserAuthenticated ? <Home /> : <Signup />} />
                <Route path='/login' element={isUserAuthenticated ? <Home /> : <Login />} />
                <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path='/tasks' element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
                <Route path='/notes' element={<ProtectedRoute><Notes /></ProtectedRoute>} />
                <Route path='/remainders' element={<ProtectedRoute><Remainders /></ProtectedRoute>} />
                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

export default Router
