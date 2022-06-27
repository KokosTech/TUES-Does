import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AccountContext } from "../contexts/UserContext";

const Login = () => {
  return (
      <div className="h-screen flex justify-evenly items-center dark:text-white dark:bg-black">
          <div className="flex flex-col w-3/12">
              <h1 className="text-4xl font-bold mb-5">log in</h1>
              <form className="flex flex-col space-y-3 dark:text-black" onSubmit={console.log()}>
                  <label className="text-lg font-semibold dark:text-white" htmlFor="email">email</label>
                  <input className="p-2 rounded-md" type="text" name="username" placeholder="username" />
                  
                  <label className="text-lg font-semibold dark:text-white" htmlFor="password">password</label>
                  <input className="p-2 rounded-md" type="password" name="password" placeholder="password" />
                  
                  <div className="flex justify-center items-center space-x-6">
                      <button className="p-2 rounded-md border bg-slate-900 dark:border-slate-800 dark:text-white dark:hover:bg-slate-800 dark:hover:border-slate-700 grow" type="submit">sign up</button>
                      <div className="flex justify-center items-center p-4">
                          <Link className="underline dark:text-white dark:hover:text-neutral-200" to='/'>sign up</Link>
                      </div>
                      
                  </div>
              
              </form>
              {/* <p>{error}</p> */}
          </div>
      </div>
  );
}

export default Login;