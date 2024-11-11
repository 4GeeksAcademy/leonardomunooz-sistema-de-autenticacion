import React, { useState, useContext } from 'react'
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

const initialUser = {
    "email": "",
    "password": ""
}

const Login = () => {

    const [user, setUser] = useState(initialUser)
    const { actions } = useContext(Context)

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        if (user.email == "" || user.password == "") {
            alert("Datos incompletos, verifique e intente nuevamente")
            return
        }
        else {

            const response = await actions.login(user)
            console.log(response)
            if (response) {
                console.log("El usuario ha sido logueado exitosamente");
                alert("Bienvenido")
            } else {
                setUser(initialUser)
                console.log("Algo ha ocurrido");
            }
        }
    }

    return (

        <div className="container m-auto " style={{ "width": "600px" }}>
            <h1 className='text-center mt-5' >login</h1>
            <form className="row" onClick={(e) => e.preventDefault()}>
                <div className="col-12">
                    <div className="mb-3">
                        <label htmlFor="formGroupEmail" className="form-label">Email</label>
                        <input
                            id="formGroupEmail"
                            type="text"
                            className="form-control"
                            placeholder="Example input email"
                            name="email"
                            value={user.email}
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="mb-3">
                        <label htmlFor="formGroupPassword" className="form-label">Password</label>
                        <input
                            id="formGroupPassword"
                            type="password"
                            className="form-control"
                            placeholder="Another input password"
                            onChange={handleChange}
                            value={user.password}
                            name="password"
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Sign in</button>
                    </div>
                </div>


            </form>

            <div className="col-12 d-flex justify-content-between">
                <Link className='mt-4' to={"/signup"}> Registrarme</Link>
                <Link className='mt-4' to={"/recuperar-contrasenia"}> Recuperar contrasenia</Link>
            </div>
        </div>

    )
}


export default Login