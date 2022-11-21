require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const path = require("path");
// express app
const app = express();

// middleware
app.use(express.json()); //so, it builts inot express so we can just say express.json() it does any request that comes in it looks if  it has some body
// to the request so some data that we are sending to the server and if it does then it passes it and attches it to the request object so that , we can access request handler,

app.use((req, res, next) => {
  console.log(req.path, req.method);
  //in order to connect next peice of middleware for the next

  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    // listen for requests

    console.log("connected to db & listening on port", process.env.PORT);
  })
  .catch((error) => {
    console.log(error);
  });

//process.env;
//  when u eventually push ur projects to github the envirimantal variables can remain hidden
// they are not visible inthe code when comes to most sensitive information like datbase connection and authentation secret dont want those things visble
//so, we seucre from .env file git ingore these file for .env acceess interminal so install npm dotenv
app.listen(process.env.PORT || 4001, () => {
  console.log("Backend is running");
});
