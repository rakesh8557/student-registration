import axios from "axios";
import "../style.css";
import Alert from "./Alert";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handlesubmit = (event) => {
        event.preventDefault();
        const values = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            role: event.target.checkbox.checked ? event.target.checkbox.value : null
        }
        axios.post("http://localhost:8000/api/user/createuser", values)
            .then(res => {
                if (res.data) {
                    if (res.data.message === "success") {
                        navigate("/signin");
                    }
                }
            })
            .catch(error => {
                if (error.response) {
                    setError({ message: error.response.data.message || 'An error occurred.' });
                    setTimeout(() => {
                        setError(null)
                    }, 1000);
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
            <div className="form-container">
                <form className="signup-form" onSubmit={handlesubmit}>
                    <div>
                        <h2>Sign Up</h2>
                    </div>
                    <div>
                        <label> Full Name </label>
                        <input type="name" name="name" id="name" />
                    </div>
                    <div>
                        <label> Email </label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label> Password </label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div>
                        <input type="checkbox" id="checkbox" name="checkbox" value="admin" />
                        <label htmlFor="checkbox">Is Admin</label><br></br>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
}

export default Signup;