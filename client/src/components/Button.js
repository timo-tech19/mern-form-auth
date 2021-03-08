import React from "react";

function Button({ children, full, ...rest }) {
    return (
        <button
            className={`uppercase rounded-full bg-gray-800 py-2 px-4 text-white block ${
                full ? "w-full" : ""
            }  mt-6`}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;
