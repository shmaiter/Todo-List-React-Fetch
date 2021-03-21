import React, { useState, useEffect } from "react";

export function ToDoList() {
	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/shmaither", {
			method: "POST", // or 'PUT'
			body: JSON.stringify([]), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/shmaither",
					{
						method: "GET",

						headers: {
							"Content-Type": "application/json"
						}
					}
				)
					.then(resp => {
						console.log("respuesta", resp);
						return resp.json();
					})
					.then(data => setList(data))

					.catch(err => {
						console.log("error", err);
					});
			})

			.catch(err => {
				console.log("error", err);
			});
	}, []);

	const addTask = () => {
		if (inputValue != "") {
			setList(newTask => [
				...newTask,
				{ label: inputValue, done: false }
			]);
			setInputValue("");
		}
		updateAPI();
	};

	const deleteTask = listIndex => {
		let updateList = list.filter(
			//underscore indicates the first parameter is not being used
			(_task, taskIndex) => taskIndex != listIndex
		);
		setList(updateList);
		updateAPI();
	};

	const deleteAll = () => {
		let emptyList = [];
		setList(emptyList);
		updateAPI();
	};

	const updateAPI = () => {
		const methods = ["PUT", "DELETE"];

		if (list.length > 0) {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/shmaither",
				{
					method: methods[0],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(list)
				}
			)
				.then(resp => {
					console.log("Respuesta de borrado", resp);
					console.log(list);
				})
				.catch(error => {
					console.log("Error delete", error);
				});
		} else {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/shmaither",
				{
					method: methods[1],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(list)
				}
			)
				.then(resp => {
					console.log("Respuesta de borrado", resp);
					console.log(list);
				})
				.catch(error => {
					console.log("Error delete", error);
				});
		}
	};

	return (
		<div className="container pt-3">
			<h1 className="text-center display-3">todos</h1>
			<card>
				<input
					type="text"
					className="form-control"
					onChange={e => setInputValue(e.target.value)}
					onKeyUp={e => (e.key === "Enter" ? addTask() : "")}
					value={inputValue}
					placeholder="Add a task here . . ."
				/>
				<div>
					<ul className="list-group list-group-flush">
						{list.map((task, listIndex) => {
							return (
								<li
									className="list-group-item d-flex justify-content-between"
									key={listIndex}>
									{task.label}
									<span onClick={() => deleteTask(listIndex)}>
										<i className="fas fa-times"></i>
									</span>
								</li>
							);
						})}
					</ul>
					<div className="card-footer bg-transparent d-flex justify-content-end pr-0">
						<p className="card-text pr-4">
							<small className="text-muted ">
								{list.length === 0
									? "(No pending tasks)"
									: list.length === 1 // if else with ternary operator
									? list.length + " task left"
									: list.length + " tasks left"}
							</small>
						</p>
						<button
							type="button"
							className="btn btn-outline-secondary btn-sm mr-2"
							onClick={() => deleteAll()}>
							Delete All
						</button>
					</div>
				</div>
			</card>
		</div>
	);
}
