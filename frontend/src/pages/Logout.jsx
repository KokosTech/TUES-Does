import { useEffect } from "react";

const Logout = () => {
    const logout = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
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