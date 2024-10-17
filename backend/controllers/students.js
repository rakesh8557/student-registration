const db = require("../dbconn");

const getAllStudents = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Please login" });
    }
    try {
        let sql = "Select s.student_id, s.student_name, s.student_email, s.father_name, s.mother_name, b.branch_name from students s right join branches b on s.branch = b.branch_id where 1";
        const queryParams = [];
        if (req.query.filter > 0) {
            sql += " and s.branch = ? ";
            queryParams.push(req.query.filter);
        }
        if (req.query.id > 0) {
            sql += " and s.student_id = ? ";
            queryParams.push(req.query.id);
        }
        // console.log()
        const students = await db.query(sql, queryParams);
        if (students.length > 0) {
            res.status(200).json({ students, name: req.user.name });
        } else {
            res.status(404).json({ message: "No Students Found" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const addnewStudent = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Please login" });
    }
    try {
        const { id, name, email, father_name, mother_name, branch } = req.body;
        const values = [id, name, email, father_name, mother_name, branch, 1];
        const sql = "INSERT INTO students (`student_id`, `student_name`, `student_email`, `father_name`, `mother_name`, `branch`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?)";
        await db.query(sql, values);
        return res.status(200).json({ message: "success" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getAllStudents, addnewStudent };