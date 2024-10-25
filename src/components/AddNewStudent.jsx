import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

const AddnewStudent = ({ student }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isIdDisabled, setIsIdDisabled] = useState(!!student);
    
    const deleteStudent = async () => {
        const values = {
            id: student.student_id,
            name: student.student_name,
            email: student.student_email,
            father_name: student.father_name,
            mother_name: student.mother_name,
            branch: student.branch,
            status: 3
        }
        const url = "http://localhost:8000/api/students/updateStudent";
        try {
            const res = await axios.post(url, values, { withCredentials: true });
            if (res.data.message) {
                navigate("/");
            }
        } catch (error) {
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
        }
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const values = {
            id: e.target.id.value,
            name: e.target.name.value,
            email: e.target.email.value,
            father_name: e.target.father_name.value,
            mother_name: e.target.mother_name.value,
            branch: e.target.branch.value,
        }
        try {
            const url = student ? "http://localhost:8000/api/students/updateStudent" : "http://localhost:8000/api/students/newStudent";
            const res = await axios.post(url, values, { withCredentials: true });
            if (res.data.message) {
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                setError({ message: error.response.data.message || 'An error occurred.' });
                setTimeout(() => {
                    setError(null)
                }, 3000);
            } else if (error.request) {
                setError({ message: 'No response received from the server.' });
                setTimeout(() => {
                    setError(null)
                }, 3000);
            } else {
                setError({ message: error.message });
                setTimeout(() => {
                    setError(null)
                }, 3000);
            }
        }
    }

    return (
        <>
            {error && <Alert message={error.message} />}
            <div style={{ marginTop: "100px" }} className="login-container">
                <div className="form-container">
                    <h1>Student Registration</h1>
                    <form id="registration-form" onSubmit={handlesubmit}>
                        <div className="form-group">
                            <label htmlFor="id" style={{ display: 'inline-block', marginRight: '8px' }}>ID:</label>
                            <input type="text" id="id" name="id" required disabled={isIdDisabled} defaultValue={student?.student_id} style={{ marginRight: '8px' }} />
                            {student && <button type="button" onClick={deleteStudent} style={{ padding: '2px 5px', fontSize: '12px' }}>
                                <FontAwesomeIcon icon={isIdDisabled ? faLock : faUnlock} />
                            </button>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required defaultValue={student?.student_name} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required defaultValue={student?.student_email} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="father-name">Father's Name:</label>
                            <input type="text" id="father-name" name="father_name" required defaultValue={student?.father_name} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mother-name">Mother's Name:</label>
                            <input type="text" id="mother-name" name="mother_name" required defaultValue={student?.mother_name} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="branch">Branch:</label>
                            <select id="branch" name="branch" required defaultValue={student?.branch || ""}>
                                <option value="" disabled selected>Select branch</option>
                                <option value="11">Computer Science</option>
                                <option value="73">Mechanical Engineering</option>
                                <option value="57">Electrical Engineering</option>
                                <option value="45">Civil Engineering</option>
                                <option value="61">Electronics Engineering</option>
                            </select>
                        </div>
                        <button type="submit">{student ? "Update" : "Register"}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddnewStudent;