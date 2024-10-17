const express = require("express");
const { getAllStudents, addnewStudent } = require("../controllers/students")

const router = express.Router();

router.get("/getAllstudents", getAllStudents);
router.post("/newStudent", addnewStudent);

module.exports = router;