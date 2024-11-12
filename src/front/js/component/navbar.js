import React, {useContext, useEffect} from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
export const Navbar = () => {
	const  {store, actions } = useContext(Context) 
	const navigate = useNavigate()

	const handleLogut = ({target}) =>{

			if (actions.logout()) {
				navigate("/login")
			}
			return
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-end" >
				<div className="">
					<Link to="">
						<button 
							className="btn btn-danger"
							onClick={handleLogut}
						>cerrar sesion</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
