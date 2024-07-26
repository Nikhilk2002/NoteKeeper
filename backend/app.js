require('dotenv').config();
const cors = require("cors");
const express = require("express");
const app = express();
const dbconnection = require('./Config/dbConnection');

const userRouter = require('./Routes/UserRouter'); 

dbconnection.dbConnect();
app.use(express.json());
app.use(cors());
app.use("/", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
