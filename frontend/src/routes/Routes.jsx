import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "../contexts/UserContext";
//import Home from "./../ToDo";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ToDo from "../pages/ToDo";

import PrivateRoutes from "./PrivateRoutes";
import Error404 from "../errors/404";

const VRoutes = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <h1>Loading...</h1>
  ) : (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<ToDo />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default VRoutes;