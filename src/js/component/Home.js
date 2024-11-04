import React, { useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

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
							setTodos([...todos, inputValue]);
							setInputValue("");
						}
					}}
					placeholder="What needs to be done?" />


				{todos.map((item, index) => (

					<li className="list-group-item li-c border px-3" key={index}>
						{item}
						<button className="btn btn-outline-light" onClick={() => {
							const updatedTodos = todos.filter(
								(_, currentIndex) => index != currentIndex
							);
							setTodos(updatedTodos);
						}}>X</button>
					</li>
				))}
			</ul>

			<div className="items text-start border border-opacity-10 px-3">{todos.length} item left</div>

		</div>
	);
};

export default Home;









