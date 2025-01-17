export const checkValidData = (email, password) => {
    // const isName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
    const isEmail = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email);
    const isPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    // if (!isName) return "Name is not valid"
    if (!isEmail) return "Email is not valid"
    if (!isPassword) return "Password is not valid"
    return null;
}