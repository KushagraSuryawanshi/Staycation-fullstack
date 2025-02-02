const express = require("express");
const router = express.Router();

//Users

//index route
router.get("/", (req, res) => {
  res.send("info of all users");
});

//show route
router.get("/:id", (req, res) => {
  let { id } = req.params;
  res.send(`info of user ${id}`);
});

//post route
router.post("/", (req, res) => {
  res.send("posting a user");
});

//delete route
router.delete("/:id", (req, res) => {
  let { id } = req.params;
  res.send(`deleting user with user id:  ${id}`);
});

module.exports = router;