import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Phone } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '', hostelOrBlock: '', role: 'USER'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/auth/register', formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] py-10">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
                <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Create Account</h2>
                <p className="text-slate-500 text-center mb-8">Join the campus delivery network</p>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input type="text" name="name" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input type="email" name="email" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input type="password" name="password" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                        <input type="text" name="phone" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Hostel / Block</label>
                        <input type="text" name="hostelOrBlock" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">I want to be a...</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'USER' })}
                                className={`py-3 rounded-xl font-semibold border ${formData.role === 'USER' ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary'}`}
                            >
                                User
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'RUNNER' })}
                                className={`py-3 rounded-xl font-semibold border ${formData.role === 'RUNNER' ? 'bg-secondary text-white border-secondary' : 'bg-white text-slate-600 border-slate-200 hover:border-secondary'}`}
                            >
                                Runner
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all mt-4">
                        Register
                    </button>

                    <div className="text-center mt-4 text-sm text-slate-500">
                        Already have an account? <span className="text-primary font-bold cursor-pointer" onClick={() => navigate('/login')}>Login</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
