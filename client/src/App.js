import userContext from "./context/userContext";
import { useState, useEffect } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    // const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (auth) setUser(auth.user);
    }, []);

    return (
        <>
            <userContext.Provider value={{ user, setUser }}>
                <Navbar setUser={setUser} />
                <Switch>
                    <Route exact path="/">
                        {user ? <Home /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path="/login">
                        {user ? <Redirect to="/" /> : <Login />}
                    </Route>
                    <Route exact path="/register">
                        {user ? <Redirect to="/" /> : <Register />}
                    </Route>
                </Switch>
            </userContext.Provider>
        </>
    );
}

export default App;
