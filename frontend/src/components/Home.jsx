import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Zap } from 'lucide-react';
import { FiEdit } from "react-icons/fi";
import { FaHandshake, FaRocket } from "react-icons/fa";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="inline-flex items-center space-x-2 bg-pink-100 text-accent px-4 py-2 rounded-full mb-8">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <span className="text-sm font-medium">Live on Campus</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
                Campus delivery <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    made simple.
                </span>
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mb-12">
                Need coffee from the cafe? Or forgot your notebook?
                Post a request and let a fellow student bring it to you.
                Earn money by delivering while you move around campus.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                    to="/create-order"
                    className="group flex items-center space-x-2 bg-accent text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary transition-all shadow-lg shadow-pink-200"
                >
                    <ShoppingBag size={20} />
                    <span>Post a Request</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                    to="/orders"
                    className="flex items-center space-x-2 bg-white text-slate-700 border border-pink-border px-8 py-4 rounded-full text-lg font-semibold hover:border-primary hover:text-primary transition-all"
                >
                    <Zap size={20} />
                    <span>View Open Orders</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-5xl px-4">
                <div className="bg-white p-6 rounded-2xl border border-pink-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4 flex justify-center">
                        <FiEdit className="text-4xl text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Post Request</h3>
                    <p className="text-slate-500">Specify what you need and where.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-pink-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4 flex justify-center">
                        <FaHandshake className="text-4xl text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Get Matched</h3>
                    <p className="text-slate-500">A detailed runner accepts your order.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-pink-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4 flex justify-center">
                        <FaRocket className="text-4xl text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Fast Delivery</h3>
                    <p className="text-slate-500">Received your items in minutes.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
