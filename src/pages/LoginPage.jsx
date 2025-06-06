import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

function LoginPage() {
	const { user, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {  // Check if a user is logged in
            navigate('/home'); // Redirect to home if logged in
        }
    }, [user, navigate]);  // 'user' state triggers navigation to /home

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/home');
        } catch (error) {
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="">Login</h2>
                {error && <p className="">{error}</p>}
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="p-2 mt-2 w-full"
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="p-2 mt-2 w-full"
                    required
                />
                <button type="submit" className="p-2 mt-4 w-full">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
