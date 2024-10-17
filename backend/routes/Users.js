const express = require("express");
const { createuser, loginuser } = require("../controllers/users")

const router = express.Router();

router.post("/createuser", createuser);
router.post("/login", loginuser);

module.exports = router;