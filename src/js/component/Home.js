import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const apiUrl = 'https://playground.4geeks.com/todo'

	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	const [userName, setUserName] = useState('SamantaSoto');

	const createUser = () => {
		fetch(apiUrl + '/users/' + userName, {
			method: "POST",
		})

			.then(resp => {
				if (resp.ok) {
					return resp.json();
				}
			})

			.then(data => {
				// Here is where your code should start after the fetch finishes
				console.log(data); // This will print on the console the exact object received from the server
			})

			.catch(error => {
				// Error handling
				console.error(error);
			});
	}

	const getData = () => {
		fetch(apiUrl + '/users/' + userName)
			.then(resp => {
				if (resp.status == 404) {
					createUser();
				}

				if (resp.ok) {
					return resp.json();
				}
			})

			.then(data => {
				if (data) {
					setTodos(data.todos);
				}
			})

			.catch(error => {
				// Error handling
				console.error(error);
			});
	}

	const postData = (newTodo) => {
		fetch(apiUrl + '/todos/' + userName, {
			method: "POST",
			body: JSON.stringify(newTodo),
			headers: {
				"Content-Type": "application/json"
			}
		})

			.then(resp => {
				return resp.json()
			})

			.then(data => {
				//console.log(data)

			})
			.catch(error => {
				return error
			})
	}

	const deleteData = (deleteTodo) => {
		fetch(apiUrl + '/todos/' + deleteTodo, {
			method: "DELETE",
			body: JSON.stringify(deleteTodo),
			headers: {
				"Content-Type": "application/json"
			}
		})

			.then(resp => {
				return resp.json()
			})
			.then(data => {
				console.log(data)

			})
			.catch(error => {
				return error
			})
	}

	const deleteAllData = () => {
		let idsTodos = [];
		todos.map((item, index) => (

			deleteData(item.id)

		))
		console.log()

	}

	useEffect(() => {
		getData()
	}, [userName]);

	return (
		<div className="text-center container p-5 text-secondary">
			<h1 className="title fw-light">todos</h1>
			<ul className="list-group list-group-flush text-start fs-3">
				<input
					className="border border-opacity-10"
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyDown={(e) => {
						if (e.key === "Enter" && inputValue !== "") {
							postData({ "label": inputValue })
							getData();
							setInputValue("");
						}
					}}
					placeholder="What needs to be done?" />

				{todos.map((item, index) => (
					<li className="list-group-item li-c border px-3" key={index}>
						{item.label}
						<button className="btn btn-outline-light" onClick={() => {
							deleteData(item.id)
							getData();
						}}>X</button>
					</li>
				))}
			</ul>
			<div className="items text-start border border-opacity-10 px-3">
				{todos.length} item left
			</div>
			<button className="btn btn-light" onClick={() => {
				deleteAllData();
				getData();
			}}>Delete all</button>
		</div>
	);
};

export default Home;









