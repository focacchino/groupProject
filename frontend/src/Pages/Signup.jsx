import React, { useState } from "react";
import './CSS/LoginSignup.css'

const LoginSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };

    return (
        <div className="loginsignup">
            <form className="loginsignup-container" onSubmit={handleSubmit}>
                <h1>Sign up</h1>
                <div className="loginsignup-fields">
                    <input
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
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
                <button type="submit">Continue</button>
                <p className="loginsignup-login">Already have an account? <span>Login here</span></p>
            </form>
        </div>
    );
};

export default LoginSignup