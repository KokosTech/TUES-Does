import { useState } from "react";

const List = () => {
    const [todos, setTodos] = useState(
    [
        {
            id: 1,
            title: "Learn React",
            completed: true
        },
        {
            id: 2,
            title: "Learn GraphQL",
            completed: false
        },
        {
            id: 3,
            title: "Learn Node",
            completed: false
        }
    ]);

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
            <h1 className="text-4xl font-bold mb-5">To Do List</h1>
            <ul className="flex flex-col space-y-3 dark:text-white">
                {todos?.map(todo => (
                    <li key={todo?.id} className={"flex justify-start items-center space-x-3 p-5 dark:bg-slate-900 border dark:border-slate-800 rounded-xl ".concat((todo?.completed) ? "opacity-80 line-through" : "")}>
                        <button className="p-2 rounded-md border bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 dark:hover:border-slate-600" onClick={() => toggleTodo(todo?.id)}></button>
                        <span className="text-lg">{todo?.title}</span>
                        <button className="p-2 rounded-md border bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 dark:hover:border-slate-600"></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default List;