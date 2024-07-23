require('dotenv').config();
const cors = require("cors");
const express = require("express");
const app = express();
const dbconnection = require('./Config/dbConnection');

const userRouter = require('./Routes/UserRouter'); 
// const adminRouter = require('./Routes/AdminRouter');

dbconnection.dbConnect();

app.use(cors());
app.use("/", userRouter);
// app.use("/admin", adminRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
