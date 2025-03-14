"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Create your server
const express_1 = __importDefault(require("express"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
// permision to acces the variables in the .env file
dotenv_1.default.config();
// create the server
const app = (0, express_1.default)();
// cookie keys
const cookie_S = process.env.COOKIE_S;
const cookie_EN = process.env.COOKIE_EN;
// if the cookies do not exits we crash the server
if (!cookie_S || !cookie_EN) {
    throw new Error("Keys missing");
}
// Middleware
//cors-conection to astro
app.use((0, cors_1.default)({
    origin: "http://localhost:4321",
    credentials: true
}));
//cookies
app.use((0, cookie_session_1.default)({
    name: "session",
    maxAge: 8 * 60 * 1000,
    keys: [
        cookie_S,
        cookie_EN
    ]
}));
// allow post request
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/", user_routes_1.default); // user routes
// fallback
app.use((req, res) => {
    res.status(404).json({ message: "Page not found!" });
});
//start the server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});
