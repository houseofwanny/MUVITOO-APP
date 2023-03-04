import React, {Component, ReactElement} from 'react'
import {Route, Navigate, RouteProps} from 'react-router-dom'

import {useAuth} from '../contexts/Auth'
interface Props {
    children: ReactElement
}

export function PrivateRoute({children}: Props) {
    const {user} = useAuth()
    if(!user){
        return <Navigate to="/login"/>
    } return children
    // return (
    //     <Route
    //         {...rest}
    //         render={(props: RouteProps ) => {
    //             // Renders the page only if `user` is present (user is authenticated)
    //             // Otherwise, redirect to the login page
    //             return user ? (<component {...props} />) : (<Navigate to="/login"/>)
    //         }}
    //     ></Route>
    // )
}