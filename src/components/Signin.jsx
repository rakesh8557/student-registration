import axios from "axios"
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Alert from "./Alert";


const Login = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handlesubmit = (e) => {
        e.preventDefault()
        const values = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        axios.post("http://localhost:8000/api/user/login", values, { withCredentials: true })
            .then(res => {
                if (res.data) {
                    if (res.data.message === "success") {
                        console.log("home");
                        navigate("/");
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
            <div className="login-container">
                <h1>Login</h1>
                <form id="loginForm" onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </>
    )
}

export default Login;