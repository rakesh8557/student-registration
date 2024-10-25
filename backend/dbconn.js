const mysql = require("mysql");
const util = require("util");

const dbConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student-registration"
})
dbConn.query = util.promisify(dbConn.query).bind(dbConn);
module.exports = dbConn;