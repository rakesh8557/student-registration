import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { useState } from "react";

const AddnewStudent = ({student}) => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    console.log(student);

    const handlesubmit = (e) => {
        e.preventDefault();
        const values = {
            id: e.target.id.value,
            name: e.target.name.value,
            email: e.target.email.value,
            father_name: e.target.father_name.value,
            mother_name: e.target.mother_name.value,
            branch: e.target.branch.value,
        }
        axios.post("http://localhost:8000/api/students/newStudent", values, { withCredentials: true })
            .then(res => {
                if (res.data.message) {
                    navigate("/");
                }
            })
            .catch(error => {
                if (error.response) {
                    setError({ message: error.response.data.message || 'An error occurred.' });
                    setTimeout(() => {
                        setError(null)
                    }, 1000);
                    navigate("/signin");
                } else if (error.request) {
                    setError({ message: 'No response received from the server.' });
                    setTimeout(() => {
                        setError(null)
                    }, 1000);
                } else {
                    setError({ message: error.message });
                    setTimeout(() => {
                        setError(null)
                    }, 1000);
                }
            })
    }

    return (
        <>
            {error && <Alert message={error.message} />}
            <div style={{ marginTop: "100px" }} className="login-container">
                <div className="form-container">
                    <h1>Student Registration</h1>
                    <form id="registration-form" onSubmit={handlesubmit}>
                        <div className="form-group">
                            <label htmlFor="name">ID:</label>
                            <input type="text" id="id" name="id" required value={student?.student_id}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="father-name">Father's Name:</label>
                            <input type="text" id="father-name" name="father_name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mother-name">Mother's Name:</label>
                            <input type="text" id="mother-name" name="mother_name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="branch">Branch:</label>
                            <select id="branch" name="branch" required>
                                <option value="" disabled selected>Select branch</option>
                                <option value="11">Computer Science</option>
                                <option value="73">Mechanical Engineering</option>
                                <option value="57">Electrical Engineering</option>
                                <option value="45">Civil Engineering</option>
                                <option value="61">Electronics Engineering</option>
                            </select>
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddnewStudent;