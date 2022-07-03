import { useEffect, useState } from "react";
import { FaCheck, FaRegTrashAlt, FaFlag, FaPlus } from "react-icons/fa";
import Modal from 'react-modal';

const List = ({ type, current }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [todos, setTodos] = useState([]);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const addNewTask = (e) => {
        e.preventDefault();
        const { task, description, priority, due } = e.target;
        const newTodo = {
            name: task.value,
            list_id: current,
            description: description.value,
            priority: priority.value,
            due_date: due.value,
            completed: false
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${current}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodo)
        })
            .then(r => {
                if (!r || !r.ok || r.status >= 400) {
                    return;
                }
                return r.json();
            })
            .then(data => {
                if (!data) {
                    return;
                }
                //setTodos([...todos, ]);
                setModalIsOpen(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const toggleTodo = (id) => {
        const todo = todos.find(todo => todo.id === id);
        const newTodo = {
            ...todo,
            completed: !todo.completed
        };
        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodo)
        })
            .then(r => {
                if (!r || !r.ok || r.status >= 400) {
                    return;
                }
                return r.json();
            })
            .then(data => {
                if (!data) {
                    return;
                }
                const newTodos = [...todos];
                const index = newTodos.findIndex(todo => todo.id === id);
                newTodos[index].completed = !newTodos[index].completed;
                setTodos(newTodos);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const flagTask = (id) => {
        const todo = todos.find(todo => todo.id === id);
        const updatedTodo = {
            ...todo,
            flagged: !todo.flagged
        };
        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTodo)
        })
            .then(r => {
                if (!r || !r.ok || r.status >= 400) {
                    return;
                }
                return r.json();
            })
            .then(data => {
                if (!data) {
                    return;
                }
                setTodos(todos.map(todo => todo.id === id ? {
                    ...todo,
                    flagged: !todo.flagged
                } : todo));
            })
            .catch(err => {
                console.log(err);
            });
    }

    const deleteTask = (id) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        setTodos(todos.filter(todo => todo.id !== id));
    }

    useEffect(() => {
        if(current) {
            let url = `${process.env.REACT_APP_SERVER_URL}/tasks/${current}`;
            console.log("TYPE", type);
            if (type === "completed") {
                url += "/completed";
            } else if (type === "progress") {
                url += "/uncompleted";
            }
            
            fetch(url, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(r => {
                if (!r || !r.ok || r.status >= 400) {
                    return;
                }
                return r.json();
            })
            .then(data => {
                if (!data) {
                    return;
                }
                setTodos(data);
                console.log(todos);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
    , [current, type]);

    return (
        <div className="w-10/12 mr-5 flex-col dark:text-white mt-5">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold mb-5">To Do List</h1>
                <button className="flex justify-center items-center p-3 border rounded-lg bg-gray-100 dark:bg-slate-900 border-gray-200 dark:border-slate-800 hover:bg-gray-200 dark:hover:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-700" onClick={openModal}>
                    <FaPlus />
                </button>
            </div>
            <ul className="flex flex-col space-y-3 dark:text-white">
                {todos?.map(todo => (
                    <li key={todo?.id} className={"flex justify-between items-center p-5 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:bg-gray-200 dark:hover:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-700 rounded-xl ".concat((todo?.completed) ? "opacity-50 line-through" : "")}>
                        <div className="flex justify-start items-center space-x-3">
                            <button className="w-2 h-2 p-2 flex justify-center items-center rounded-full border bg-gray-200 dark:bg-slate-800 border-gray-300 dark:border-slate-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-700 hover:border-gray-400 dark:hover:border-slate-600 overflow-visible" onClick={() => toggleTodo(todo?.id)}>{todo?.completed && <FaCheck className="w-6 h-6 absolute" />}</button>
                            <span className="text-lg">{todo?.name}</span>
                        </div>
                        <div className="flex justify-start items-center space-x-3">
                            <button className={`w-[34px]  h-[34px] p-2 rounded-md border ${todo.flagged ? 'bg-amber-500 dark:bg-amber-800 border-gray-300 dark:border-slate-700 hover:bg-amber-600 dark:hover:bg-amber-700 hover:border-gray-400 dark:hover:border-slate-600' : 'bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-600'}`} onClick={() => flagTask(todo?.id)}><FaFlag /></button>
                            <button className="w-[34px]  h-[34px] p-2 rounded-md border bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-600" onClick={() => deleteTask(todo?.id)}><FaRegTrashAlt /></button>
                        </div>
                    </li>
                ))}
            </ul>
            <Modal
                isOpen={modalIsOpen}
                className="absolute top-1/2 left-1/2 right-auto bottom-auto -mr-[50%] -translate-y-[50%] -translate-x-[50%] 
                    bg-gray-100 dark:bg-slate-900
                    w-1/3 p-3 rounded-lg overflow-hidden
                    border border-gray-300 dark:border-slate-800
                    shadow-lg dark:shadow-slide-lg"
                onRequestClose={closeModal}
                contentLabel="Add new task"
                //className="bg-white"
            >
                <form onSubmit={addNewTask} className="flex flex-col p-3 space-y-2 divide-y dark:text-white">
                    <h3 className="text-2xl font-bold">Add new task</h3>
                    
                    <div className="flex flex-col pt-2 pb-2 space-y-2">
                        <label htmlFor="task" className="font-semibold">Task</label>
                        <input id="task" name="task" type="text" placeholder="task" className="p-2 rounded-md bg-white border border-slate-200 hover:border-slate-300"/>

                        <label htmlFor="description" className="font-semibold">Description</label>
                        <textarea name="description" placeholder="description" className="resize-none p-2 rounded-md bg-white border border-slate-200 hover:border-slate-300"/>

                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <label htmlFor="priority" className="font-semibold">Priority</label>
                                <div className="flex h-full items-center space-x-4 mr-6">
                                    <div className="flex items-center space-x-2">
                                        <input id="priority" name="priority" type="radio" value="1" className=""/>
                                        <label>low</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input id="priority" name="priority" type="radio" value="2" className=""/>
                                        <label>mid</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input id="priority" name="priority" type="radio" value="3" className=""/>
                                        <label>high</label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col grow">
                                <label htmlFor="due" className="font-semibold">Due date</label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                    </div>
                                    <input id="due" name="due" type="date" className="pl-10 p-2 rounded-md bg-white border border-slate-200 hover:border-slate-300 w-full"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="m-10 p-2 px-4 py-2 rounded-md border bg-white border-gray-200 hover:border-gray-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 dark:hover:border-slate-600">Add</button>
                </form>
            </Modal>
        </div>
    );
}

export default List;