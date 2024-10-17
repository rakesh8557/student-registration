const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
    const tokenCookie = req.cookies?.token;
    if (!tokenCookie) {
        return next();
    }
    const user = verifyToken(tokenCookie);
    req.user = user;
    return next();

}

const verifyToken = (token) => {
    if (!token) throw new Error("Token is required");
    return jwt.verify(token, "meisrakesh");

}

module.exports = { checkLogin };