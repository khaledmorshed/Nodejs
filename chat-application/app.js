// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

// internal imports
const { notFoundHandler, errorHandler } = require("./midlewares/common/errorHandler")

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successfull"))
  .catch((err) => console.log(err));

// request parse
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for html form handleing

// set view engine
app.set("view engine", "ejs"); // by default it will search views folder(whic is created manually)

// set static folder(all document will be put in public folder)
app.use(express.static(path.join(__dirname, "public")));

// parese cookies
app.use(cookieParser(process.env.COOKIE_SECRET)); 

//routing set up
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

// error handling
// 404 not found handler
app.use(notFoundHandler);

// common handler
app.use(errorHandler);

app.listen(process.env.PORT, ()=> {
    console.log(`app listenign to port ${process.env.PORT}`);
});