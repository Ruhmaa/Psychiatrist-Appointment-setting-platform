import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'psychiatrist' && password === 'securepassword') {
            onLogin(); // Mark the user as authenticated
            navigate('/appointment-list'); // Redirect to AppointmentList
        } else {
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <h1>Psychiatrist Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* <label>Username:</label>     */}
                    <input
                        type="text"
                        value={username}
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* <label>Password:</label> */}
                    <input
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
