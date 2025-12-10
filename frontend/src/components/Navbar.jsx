import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-slate-100">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <Package size={24} className="text-primary" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        CampusDelivery
                    </span>
                </Link>
                <div className="flex items-center space-x-6">
                    <Link to="/create-order" className="text-slate-600 hover:text-primary font-medium transition-colors">
                        Post Request
                    </Link>
                    <Link to="/orders" className="text-slate-600 hover:text-primary font-medium transition-colors">
                        Open Orders
                    </Link>
                    <Link
                        to="/runner"
                        className="flex items-center space-x-2 bg-dark text-white px-4 py-2 rounded-full hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200"
                    >
                        <Truck size={18} />
                        <span>Runner Mode</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
