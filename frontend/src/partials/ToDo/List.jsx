import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { FaCheck, FaRegTrashAlt, FaFlag, FaPlus } from "react-icons/fa";

const List = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [listID, setListID] = useState(2);
    const [todos, setTodos] = useState([]);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    function openModal() {
        setModalIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setModalIsOpen(false);
      }

/*     const addTodo = () => {
        return (

        );
    } */

    const addNewTask = (e) => {
        e.preventDefault();
        const { task, description, priority, due } = e.target;
        const newTodo = {
            name: task.value,
            list_id: listID,
            description: description.value,
            priority: priority.value,
            due_date: due.value,
            completed: false
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${listID}`, {
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
        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${listID}`, {
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
    , [todos]);

    return (
        <div className="w-10/12 mr-5 flex-col dark:text-white mt-5">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold mb-5">To Do List</h1>
                <button className="flex justify-center items-center p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-800" onClick={openModal}>
                    <FaPlus />
                </button>
            </div>
            <ul className="flex flex-col space-y-3 dark:text-white">
                {todos?.map(todo => (
                    <li key={todo?.id} className={"flex justify-between items-center p-5 dark:bg-slate-900 border dark:border-slate-800 rounded-xl ".concat((todo?.completed) ? "opacity-80 line-through" : "")}>
                        <div className="flex justify-start items-center space-x-3">
                            <button className="p-2 rounded-md border bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 dark:hover:border-slate-600" onClick={() => toggleTodo(todo?.id)}></button>
                            <span className="text-lg">{todo?.name}</span>
                        </div>
                        <div className="flex justify-start items-center space-x-3">
                            <button className={`p-2 rounded-md border dark:text-white ${todo.flagged ? 'bg-amber-800 border-slate-700 hover:bg-amber-700 hover:border-slate-600' : 'bg-slate-800 dark:border-slate-700  dark:hover:bg-slate-700 dark:hover:border-slate-600'}`} onClick={() => flagTask(todo?.id)}><FaFlag /></button>
                            <button className="p-2 rounded-md border bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 dark:hover:border-slate-600" onClick={() => deleteTask(todo?.id)}><FaRegTrashAlt /></button>
                        </div>
                    </li>
                ))}
            </ul>
            <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={addNewTask}>
            <input id="task" name="task" type="text" placeholder="task" />
            <label htmlFor="description">Description</label>
            <textarea name="description" placeholder="description" />
            <label htmlFor="priority">Priority</label>
            <input id="priority" name="priority" type="radio"value="1" />
            <input id="priority" name="priority" type="radio"value="2" />
            <input id="priority" name="priority" type="radio"value="3" />
            <label htmlFor="due">Due date</label>
            <input id="due" name="due" type="date" />
            <button type="submit">Add</button>
        </form>
      </Modal>
        </div>
    );
}

export default List;