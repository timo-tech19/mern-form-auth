import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import userContext from "../context/userContext";

function Navbar({ setUser }) {
    const { user } = useContext(userContext);
    // const history = useHistory();

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <nav className="w-full bg-gray-800 text-gray-400">
            <div className="container mx-auto  flex justify-between content-center py-2">
                <div className="text-2xl">
                    <Link to="/">
                        <span className="text-gray-50">A</span>uth
                    </Link>
                </div>
                {user ? (
                    <ul className="flex uppercase py-2">
                        <li className="ml-4">
                            <Link to="/login" onClick={logout}>
                                Logout
                            </Link>
                        </li>
                        <li className="ml-4">Hello, {`${user.name}`}</li>
                    </ul>
                ) : (
                    <ul className="flex uppercase py-2">
                        <li className="ml-4">
                            <Link to="/register">Register</Link>
                        </li>
                        <li className="ml-4">
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
