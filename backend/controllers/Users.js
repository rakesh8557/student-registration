const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../dbconn");
const salt = 10;

const createuser = async (req, res) => {
    const {name, email, password, role} = req.body;
    try {
        const rows = await db.query("SELECT * from user where email = ?", [email]);
        if (rows.length > 0) {
            return res.status(409).json({message : "Email Already Exists"});
        }

        const hash = await bcrypt.hash(password, salt);

        const values = [name, email, hash, role];
        const sql = "INSERT INTO user (`name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)";

        await db.query(sql, values);

        return res.json({message : "success"});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const loginuser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await db.query("Select * from user where email = ?", [email]);
        if(user.length === 0) {
            return res.status(409).json({message : "Email already exists"});
        }
        const isMatch = await bcrypt.compare(password,user[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({name : user[0].name, id: user[0].id }, "meisrakesh");
        res.cookie("token", token);
        
        res.status(200).json({message : "success"});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { createuser, loginuser }