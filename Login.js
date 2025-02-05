// Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically validate the user credentials
        // For simplicity, we'll just call onLogin with the email
        onLogin(email);
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* <label>Email:</label> */}
                    <input 
                        type="email" 
                        value={email} 
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    {/* <label>Password:</label> */}
                    <input 
                        type="password" 
                        value={password} 
                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;