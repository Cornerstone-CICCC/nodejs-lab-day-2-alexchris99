"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        res.status(503).send("Already login");
        return;
    }
    next();
};
exports.checkAuth = checkAuth;
