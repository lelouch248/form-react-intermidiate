const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
mongoose.set("strictQuery", true);

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      methods: "GET, POST, PUT,DELETE",
    })
  );

mongoose
  .connect(
    "mongodb+srv://Karthik:karthik@cluster0.fohsgzm.mongodb.net/UserDb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  Password: String,
});

const User = new mongoose.model("User", userSchema);

app.post("/register", (req, res) => {
  console.log(req.body);
  console.body("client has spoken to server");
  const user = new User({
    username: req.body.username,
    Password: req.body.Password,
  });
  user.save((err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
      res.send("User information saved");
    }
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
