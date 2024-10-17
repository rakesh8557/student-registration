const express = require("express");
const studentRoute = require("./routes/Students");
const userRoute = require("./routes/Users");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const {checkLogin} = require("./middleware/authentication");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
app.use(cookieparser());
app.use(checkLogin);

app.use("/api/students", studentRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
    res.json({message : "hello from server"})
})

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));