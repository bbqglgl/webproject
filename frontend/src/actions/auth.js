export const local_login = (_id, email) => ({
    type: "auth/LOGIN",
    email,
    _id
});

export const local_logout = () => ({
    type: "auth/LOGOUT",
});