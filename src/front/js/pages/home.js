import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">	
		
			{
				store.token ? <h1>Vista privada</h1> : <Navigate to= "/login" />
 			
			}
			
		</div>
	);
};
