import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();
    const [students, setStudents] = useState(null);
    const [user, setUser] = useState("");
    const [filter, setfilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/api/students/getAllstudents", { withCredentials: true })
            .then(res => {
                setStudents(res.data.students);
                setUser(res.data.name);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                navigate("/signin");
            })

    }, []);

    const handleAddNew = () => {
        navigate("/addNewStudent");
    }

    const handleFilter = (e) => {
        setfilter(e.target.value);
    }

    useEffect(() => {
        if (!filter) return;
        axios.get("http://localhost:8000/api/students/getAllstudents", { params: { filter }, withCredentials: true })
            .then(res => {
                setStudents(res.data.students);
            })
            .catch(error => {

            })
    }, [filter]);

    return (
        <>
            {!students && <div>Loading...</div>}
            <div className="home-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h1 style={{ margin: '0', textAlign: 'center', flex: 1 }}>Hi {user}</h1>
                    <div style={{ marginRight: "6px" }}>
                        <select id="branch" name="branch" onChange={handleFilter} required>
                            <option value="-1">Filter from branch</option>
                            <option value="11">Computer Science</option>
                            <option value="73">Mechanical Engineering</option>
                            <option value="57">Electrical Engineering</option>
                            <option value="45">Civil Engineering</option>
                            <option value="61">Electronics Engineering</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={handleAddNew} style={{ padding: "2px" }}>Add new Student</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Father's Name</th>
                            <th>Mother's Name</th>
                            <th>Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students && Object.entries(students).map(([key, student], index) => (
                            <tr key={`${student.id}-${index}`}>
                                <td>
                                    <Link to={`editStudent/${student.student_id}`}>{index + 1}</Link>
                                </td>
                                <td>{student.student_id}</td>
                                <td>{student.student_name}</td>
                                <td>{student.student_email}</td>
                                <td>{student.father_name}</td>
                                <td>{student.mother_name}</td>
                                <td>{student.branch_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home;