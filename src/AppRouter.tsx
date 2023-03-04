import React from 'react';
import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom'

import Home from './pages/Index'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import MovieDetails from './pages/MovieDetails';
import {AuthProvider} from "./contexts/Auth";
import {PrivateRoute} from "./components/PrivateRoute";
import Index from "./pages/Index";
import Favourites from "./pages/Favourites";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <>
            <div className=''>
                <Outlet/>
            </div>
        </>
    )
}

const AppRouter = () => (
    <BrowserRouter>
        <ToastContainer />
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/create-account' element={<SignUp/>}/>
                    <Route index element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }/>
                    {/* {/* {/<Route path='/search' element={<Search />} /> */}
                    <Route path='movie-details/:movieId' element={
                        <PrivateRoute>
                            <MovieDetails/>
                        </PrivateRoute>
                    }/>
                    <Route path='favourites' element={
                        <PrivateRoute>
                            <Favourites />
                        </PrivateRoute>
                    }/>
                </Route>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
)

export default AppRouter
