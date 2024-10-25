const express = require("express");
const { getAllStudents, addnewStudent, updateStudent } = require("../controllers/students")

const router = express.Router();

router.get("/getAllstudents", getAllStudents);
router.post("/newStudent", addnewStudent);
router.post("/updateStudent", updateStudent)

module.exports = router;