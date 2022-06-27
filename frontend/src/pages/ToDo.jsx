import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../contexts/UserContext";

import Navigation from "../partials/ToDo/Navigation";
import List from "../partials/ToDo/List";
import Details from "../partials/ToDo/Details";


const ToDo = () => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="flex dark:text-white">
            <Navigation />
            <List />
            {showDetails && <Details />}
        </div>
    );
}
export default ToDo;