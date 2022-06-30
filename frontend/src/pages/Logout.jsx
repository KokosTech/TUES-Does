import { useEffect } from "react";

const Logout = () => {
    const logout = () => {
        localStorage.removeItem("sid");
        window.location.href = "/";
    }
    useEffect(() => {
        logout();
    }, []);
    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}

export default Logout;