// import Signup from "../component/Signup";

import { Navigate, useNavigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token : sessionStorage.getItem("token") ||  null
		},
		
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login : async (user) => {
				try{
					const response  = await fetch(`${process.env.BACKEND_URL}/api/login`,{
						method : "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body : JSON.stringify(user)
					})

					// devuelve el token
					const data =  await response.json()
					console.log(response.status)
					if (response.status == 200) {		
						setStore({
							token : data.token
						})
						sessionStorage.setItem("token", data.token)				
						return true
					} else if (response.status == 404){
						return 404
					} 
				}catch(error){
					console.log(error);
				}
			},
			signup : async (user) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						method : "POST",
						headers : {
							"Content-Type" : "application/json"
						},
						body : JSON.stringify(user)
					})

					if (response.status == 201) {
						return true
						 
					}else {
						return false
					}
				} catch (error) {
					console.log(error);
				}
			},
			logout : async () => {
				if (getStore().token !== null) {
					sessionStorage.removeItem("token")
					return true
				}else {
					return false
				}
				
			}
		}
	};
};

export default getState;



// probar con integracion sessionStorage