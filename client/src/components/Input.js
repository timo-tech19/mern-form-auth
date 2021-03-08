function Input({ label, ...rest }) {
    return (
        <div className="flex flex-col w-full my-3">
            <label className="text-xs text-gray-400">{label}</label>
            <input
                className="border-b-2 w-full focus:outline-none"
                {...rest}
                required
            />
        </div>
    );
}

export default Input;
