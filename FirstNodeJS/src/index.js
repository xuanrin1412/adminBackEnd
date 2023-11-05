const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const clothesRouter = require("./routes/clothes.js");
const registerRouter = require("./routes/register.js");
const loginRouter = require("./routes/login.js");

const cookieParser = require("cookie-parser");

const app = express();
const port = 3001;

mongoose
    .connect("mongodb://0.0.0.0:27017/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Kết nối thành công");
    })
    .catch((err) => {
        console.log("Lỗi kết nối:", err);
    });

app.use(
    cors({
        origin: "http://localhost:3002",
        credentials: true, // Bật hỗ trợ cho credentials
    })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/clothes", clothesRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
