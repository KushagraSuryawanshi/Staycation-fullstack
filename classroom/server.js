const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(flash());

const sessionOptions = {
  secret: "secretcode",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));

app.use((req, res, next) => {
  res.locals.errMsg = req.flash("error");
  res.locals.successMsg = req.flash("success");
  next();
});

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  if (name == "anonymous") {
    req.flash("error", "Try again later");
  } else {
    req.flash("success", "user registered successfully");
  }
  res.redirect("/name");
});

app.get("/name", (req, res) => {
  res.render("page.ejs", { name: req.session.name });
});

app.listen(3000, () => {
  console.log("server is listening at port 3000");
});
