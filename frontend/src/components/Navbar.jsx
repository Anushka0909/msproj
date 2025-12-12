import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Package, Truck, PlusCircle, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? "bg-pink-100 text-accent" : "text-slate-600 hover:text-primary";

    return (
        <nav className="bg-white border-b border-pink-border shadow-sm sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 group">
                    <div className="bg-primary text-white p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-pink-200">
                        <Package size={24} />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dark to-primary">
                        CampusRun
                    </span>
                    <span className="text-primary text-xs" title="Cute delivery service">🎀</span>
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    {!user ? (
                        <>
                            <Link to="/login" className="text-slate-600 font-medium hover:text-primary transition-colors">Login</Link>
                            <Link to="/register" className="bg-accent text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary transition-all shadow-lg shadow-pink-200">
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <>
                            {user.role === 'USER' && (
                                <>
                                    <Link to="/create-order" className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-medium ${isActive('/create-order')}`}>
                                        <PlusCircle size={18} />
                                        <span>Post Request</span>
                                    </Link>
                                    <Link to="/orders" className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-medium ${isActive('/orders')}`}>
                                        <Package size={18} />
                                        <span>My Orders</span>
                                    </Link>
                                </>
                            )}

                            {user.role === 'RUNNER' && (
                                <Link to="/runner" className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-medium ${isActive('/runner')}`}>
                                    <Truck size={18} />
                                    <span>Runner Dashboard</span>
                                </Link>
                            )}

                            <div className="h-6 w-px bg-slate-200 mx-2"></div>

                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-pink-100 text-accent rounded-full flex items-center justify-center font-bold text-xs">
                                    {(user.name || 'U').charAt(0)}
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{user.name}</span>
                            </div>

                            <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors" title="Logout">
                                <LogOut size={20} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
