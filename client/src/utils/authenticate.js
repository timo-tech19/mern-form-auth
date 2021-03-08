const authenticate = (data, setUser, history) => {
    // Store token in local storage
    localStorage.setItem(
        "auth",
        JSON.stringify({
            token: data.token,
            user: data.user,
        })
    );

    setUser(data.user);

    // redirect to home route
    history.push("/");
};

export default authenticate;
