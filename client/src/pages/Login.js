import { useState, useEffect, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Input from "../components/Input";
import Button from "../components/Button";
import withForm from "../hoc/withForm";

import userContext from "../context/userContext";
import authenticate from "../utils/authenticate";

function Login({ timeline }) {
    const [input, setInput] = useState({ password: "", email: "" });
    const history = useHistory();
    const formRef = useRef(null);

    const { setUser } = useContext(userContext);

    useEffect(() => {
        timeline.from(formRef.current.children, {
            duration: 1,
            x: "-100",
            opacity: 0,
            ease: "bounce",
            stagger: 0.2,
        });
    }, [timeline]);

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setInput((state) => ({ ...state, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { password, email } = input;

        try {
            // get token from response
            const { data } = await axios.post(
                "http://localhost:3000/api/auth/login",
                {
                    password,
                    email,
                }
            );

            authenticate(data, setUser, history);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <form
            ref={formRef}
            className="py-10 px-5 sm:px-10  w-1/2 flex flex-col content-center"
        >
            <Input
                name="email"
                type="email"
                label="Email"
                onChange={handleInputChange}
                value={input.email}
            />
            <Input
                name="password"
                type="password"
                label="Password"
                onChange={handleInputChange}
                value={input.password}
            />
            <div>
                <Button full type="submit" onClick={onSubmit}>
                    Login
                </Button>
                <br />
                Do not have an account?&nbsp;
                <Link className="text-gray-800 underline" to="/register">
                    Register
                </Link>
            </div>
        </form>
    );
}

export default withForm(Login, "Login", "bg-login");
