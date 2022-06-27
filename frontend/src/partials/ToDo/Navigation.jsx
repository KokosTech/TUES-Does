import { useState, useContext } from "react";

import NavItem from './NavItem'

const Navigation = ({ isLoggedIn }) => {
    const [current, setCurrent] = useState('')
    const [user, setUser] = useState('')

    const lists = ['To Do', 'In Progress', 'Done'];

    return (
        <div className="sticky top-0 w-2/12 p-5 h-screen">
            <div className="p-2 h-full rounded-xl dark:bg-slate-900 overflow-hidden divide-y space-y-2 divide-slate-800">
                <div class='user flex items-center space-x-5 m-2'>
                    <img class='w-16 border dark:border-slate-700 rounded-full' src={user?.pic || '/default.png'} alt='user profile'/>
                    <p>{ user?.username || '(null)'}</p>
                </div>
                { lists?.map(list => (<NavItem list={list} />)) }
            </div>
        </div>
    );         
}

export default Navigation;