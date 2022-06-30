import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from '../../contexts/UserContext';

import NavItem from './NavItem'

const Navigation = ({ isLoggedIn }) => {
    const [current, setCurrent] = useState('')
    const { user } = useContext(AccountContext);

    const lists = ['To Do', 'In Progress', 'Done'];

    return (
        <div className="sticky top-0 w-2/12 p-5 h-screen">
            <div className="p-2 h-full flex flex-col justify-between rounded-xl dark:bg-slate-900 overflow-hidden divide-y space-y-2 divide-slate-800">
                <div className="flex flex-col justify-start divide-y divide-slate-800">
                    <div className='user flex items-center space-x-5 m-2'>
                        <img class='w-16 border dark:border-slate-700 rounded-full' src={user?.pic || '/default.png'} alt='user profile'/>
                        <p>{ user?.username || '(null)'}</p>
                    </div>
                    <div>
                        { lists?.map(list => (<NavItem list={list} />)) }
                        <div 
                            className="m-2 p-2 dark:hover:bg-slate-800 rounded-lg cursor-pointer" 
                        >
                            <p className="text-gray-600">+ add list</p>
                        </div>
                    </div>
                </div>
                <>
                    <Link to='/logout' className="flex justify-center items-center p-4">
                        <p className="text-lg font-semibold dark:text-white">log out</p>
                    </Link>
                </>
            </div>
        </div>
    );         
}

export default Navigation;