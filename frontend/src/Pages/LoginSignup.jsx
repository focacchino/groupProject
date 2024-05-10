import React, { useState } from "react";
import './CSS/LoginSignup.css'

const LoginSignup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login details:', formData);
    };

    return (
        <div className="loginsignup">
            <form className="loginsignup-container" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="loginsignup-fields">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Login</button>
                <p className="loginsignup-login">Don't have an account? <span>Sign up here</span></p>
            </form>
        </div>
    );
};

export default LoginSignup