import { useState, useEffect, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Input from "../components/Input";
import Button from "../components/Button";
import withForm from "../hoc/withForm";

import authenticate from "../utils/authenticate";
import userContext from "../context/userContext";

function Register({ timeline }) {
    const [input, setInput] = useState({
        password: "",
        email: "",
        username: "",
        confirmPassword: "",
    });
    const formRef = useRef(null);
    const { setUser } = useContext(userContext);

    const history = useHistory();

    useEffect(() => {
        timeline.from(formRef.current.children, {
            duration: 1,
            x: "-100",
            opacity: 0,
            ease: "bounce",
            stagger: 0.2,
        });
    }, [timeline]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const { username, password, email, confirmPassword } = input;

        // Check if passwords are the same
        if (password !== confirmPassword) {
            alert("Password is not the same");
            return;
        }

        try {
            // get token from response
            const { data } = await axios.post(
                "http://localhost:3000/api/auth/register",
                {
                    username,
                    password,
                    email,
                }
            );

            authenticate(data, setUser, history);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setInput((state) => ({ ...state, [name]: value }));
    };

    return (
        <form
            ref={formRef}
            className="py-10 px-5 sm:px-10  w-1/2 flex flex-col content-center"
        >
            <Input
                name="username"
                type="text"
                label="Username"
                onChange={handleInputChange}
                value={input.username}
            />
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
            <Input
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                onChange={handleInputChange}
                value={input.confirmPassword}
            />
            <div>
                <Button full type="submit" onClick={onSubmit}>
                    Register
                </Button>
                <br />
                Already have an account?&nbsp;
                <Link className="text-gray-800 underline" to="/login">
                    Login
                </Link>
            </div>
        </form>
    );
}

export default withForm(Register, "Register", "bg-register");
