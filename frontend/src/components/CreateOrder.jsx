import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapPin, Package, DollarSign, ArrowRight } from 'lucide-react';

const CreateOrder = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    // Redirect if not user (extra safety)
    if (!user || user.role !== 'USER') {
        window.location.href = '/login';
    }

    const [formData, setFormData] = useState({
        userId: user ? user.userId : '',
        itemId: '',
        pickupLocation: '',
        dropLocation: '',
        priceOffered: ''
    });

    const handleChange = (e) => {
        setFormData({ week: formData, [e.target.name]: e.target.value, ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/orders', formData);
            alert('Order created successfully!');
            navigate('/orders');
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Post a Request</h2>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">What do you need?</label>
                        <div className="relative">
                            <Package className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="text"
                                name="itemId"
                                value={formData.itemId}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="E.g., Iced Coffee, Notebook, Printout"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Pickup Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    name="pickupLocation"
                                    value={formData.pickupLocation}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="E.g., Canteen, Library"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Drop Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    name="dropLocation"
                                    value={formData.dropLocation}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="E.g., Block A, Room 101"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Offer Price (₹)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="number"
                                name="priceOffered"
                                value={formData.priceOffered}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="50"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center space-x-2 mt-8">
                        <span>Post Request</span>
                        <ArrowRight size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateOrder;
