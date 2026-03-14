import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from '../pages/Index/Index'
import Home from '../pages/Home/Home'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'

function Router() {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default Router
