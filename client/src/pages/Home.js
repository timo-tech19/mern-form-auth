// import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import Button from "../components/Button";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import axios from "axios";

function Home() {
    const headerRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
    const [data, setData] = useState("");

    useEffect(() => {
        const tl = gsap.timeline();
        tl.from(headerRef.current, { duration: 1, y: "-100", opacity: 0 })
            .from(
                textRef.current,
                { duration: 1, x: "-100", opacity: 0 },
                "-=.5"
            )
            .from(buttonRef.current, { duration: 1, y: "30", opacity: 0 });
    }, []);

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (auth) fetchData(auth.token);
    });

    const fetchData = async (token) => {
        try {
            const { data } = await axios({
                method: "get",
                baseURL: `http://localhost:3000/api/private`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setData(data.data);
        } catch (error) {
            console.log(error.response.data);
        }

        // setData(data);
    };

    return (
        <header className="container flex flex-col content-center">
            <h1
                ref={headerRef}
                className="text-7xl text-center font-bold my-20 capitalize"
            >
                {data}
            </h1>
            <p
                ref={textRef}
                className="text-lg leading-6 w-3/4 text-gray-700 text-center mx-auto"
            >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptate ipsam recusandae voluptatem dolorum officiis corporis
                voluptatum eum consectetur sit fugiat porro cupiditate, culpa
                excepturi, iusto quam laboriosam natus fugit eligendi.
            </p>

            <span ref={buttonRef} className="mx-auto">
                <Button>Thanks for registering</Button>
            </span>
        </header>
    );
}

export default Home;
