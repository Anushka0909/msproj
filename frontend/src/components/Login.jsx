import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/auth/login', formData);
            const { userId, role, name } = res.data;

            // Save to localStorage
            localStorage.setItem('user', JSON.stringify({ userId, role, name }));

            // Redirect based on role
            if (role === 'RUNNER') navigate('/runner');
            else navigate('/orders'); // User goes to orders

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
                <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Welcome Back</h2>
                <p className="text-slate-500 text-center mb-8">Login to access your account</p>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email Address</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all flex justify-center items-center space-x-2">
                        <span>Sign In</span>
                        <ArrowRight size={20} />
                    </button>

                    <div className="text-center mt-4 text-sm text-slate-500">
                        Don't have an account? <span className="text-primary font-bold cursor-pointer" onClick={() => navigate('/register')}>Register</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
