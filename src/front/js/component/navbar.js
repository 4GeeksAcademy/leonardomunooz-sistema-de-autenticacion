import React, {useContext, useEffect} from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from 'sweetalert2'

export const Navbar = () => {
	const  {store, actions } = useContext(Context) 
	const navigate = useNavigate()

	// const handleLogut = () =>{
	// 		const isLogout =  actions.logout()
	// 		if (isLogout) {
	// 			location.reload()
	// 		}else {
	// 			console.log('algo ha ocurrido navbar')
	// 		}
		
	// }
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-end" >
				<div className="">
					<Link to="/login">
						<button 
							className="btn btn-danger"
							onClick={()=> actions.logout()}
						>cerrar sesion</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
