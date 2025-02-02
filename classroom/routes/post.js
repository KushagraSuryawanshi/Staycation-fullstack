const express = require("express");
const router = express.Router();

//posts

//SHOW
router.get("/", (req, res) => {
  res.send("index route for posts");
});
//POST
router.post("/:id", (req, res) => {
  res.send("post for posts");
});

//DELETE
router.delete("/:id", (req, res) => {
  res.send("delete for posts :id");
});

module.exports = router;
