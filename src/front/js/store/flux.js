// import Signup from "../component/Signup";

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
			urlBase : "https://opulent-space-adventure-4jq4q4qpvgqp25xq6-3001.app.github.dev/api",
			token : null
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
					const response  = await fetch(`${getStore().urlBase}/login`,{
						method : "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body : JSON.stringify(user)
					})
					if (response.ok) {						
						return true
					}else {
						return false
					}
				}catch(error){
					console.log(error);
				}
			},
			signup : async (user) => {
				try {
					const response = await fetch(`${getStore().urlBase}/user`, {
						method : "POST",
						headers : {
							"Content-Type" : "application/json"
						},
						body : JSON.stringify(user)
					})

					if (response.ok) {
						console.log("El usuario ha sido registrado correctamente")
						return true
						 
					}else {
						alert("Algo ha ocurrido")
						return false
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
	};
};

export default getState;
