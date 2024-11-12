import React, { useState, useContext } from 'react'
import { Context } from '../store/appContext'
import { Navigate } from 'react-router-dom'

import { Navbar } from './navbar'


const Private = () => {

    const { store } = useContext(Context)
    return (
        <div className="text-center">
            <Navbar />
            {
                store.token ? <h1>Vista privada</h1> : <Navigate to="/login" />
            }
        </div>
    );

}


export default Private