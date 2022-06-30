import { useState } from "react";
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
            due_date: due.value || Date.now(),
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
            }
            )
            .then(data => {
                if (!data) {
                    return;
                }
                setTodos([...todos, data]);
            }
            )
            .catch(err => {
                console.log(err);
            }
            );
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

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }   
            return todo;
        }
    ));}

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
                            <span className="text-lg">{todo?.title}</span>
                        </div>
                        <button className="p-2 rounded-md border bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 dark:hover:border-slate-600" onClick={() => deleteTask(todo?.id)}><FaRegTrashAlt /></button>
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