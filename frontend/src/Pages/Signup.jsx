import React, { useState } from "react";
import './CSS/LoginSignup.css'
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevData => ({
           ...prevData,
            [name]: type === "checkbox"? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Basic validation (you can add more complex validation as needed)
            if (!formData.email ||!formData.password) {
                alert('Please fill in all fields.');
                return;
            }

            const response = await axios.post('http://localhost:4000/signup', formData);
            console.log('Data sent successfully:', response.data);
            // Redirect or show success message
            alert('Sign-up successful. Please log in.');
            // Redirect to login page or another part of your application
        } catch (error) {
            console.error('Failed to send data:', error);
            // Display a generic error message or a specific one based on the error
            alert('Failed to sign up. Please try again.');
        }
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
                <p className="loginsignup-login">Already have an account? <a href="/login">Login here</a></p>
            </form>
        </div>
    );
};

export default Signup;