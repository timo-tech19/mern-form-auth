import { useEffect, useRef } from "react";
import gsap from "gsap";

const withForm = (ChildComponent, title, bg) => () => {
    const titleRef = useRef(null);
    const bgRef = useRef(null);
    const tl = gsap.timeline();

    useEffect(() => {
        tl.from(
            bgRef.current,
            {
                duration: 1.5,
                x: 250,
                opacity: 0,
                ease: "power4.out",
            },
            "-=0.5"
        ).from(
            titleRef.current,
            {
                duration: 0.5,
                y: 30,
                opacity: 0,
                scale: 0.5,
                ease: "power2.out",
            },
            "-=0.8"
        );
    }, [tl]);

    return (
        <section className="flex max-w-xl md:max-w-4xl  rounded-md shadow-lg overflow-hidden my-10 mx-auto">
            <div ref={bgRef} className="bg-gray-700 w-1/2 relative">
                <h1
                    ref={titleRef}
                    className="text-center w-full top-16 text-white absolute z-10 text-4xl"
                >
                    {title}
                </h1>
                <img
                    className="h-full w-full object-cover absolute block"
                    src={`img/${bg}.jpg`}
                    alt="brick wall"
                />
            </div>
            <ChildComponent timeline={tl} />
        </section>
    );
};

export default withForm;
