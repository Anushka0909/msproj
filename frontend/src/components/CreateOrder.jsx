import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Package, User } from 'lucide-react';

const CreateOrder = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: '',
        itemId: '',
        pickupLocation: '',
        dropLocation: '',
        priceOffered: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/orders', formData);
            navigate('/orders');
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200 overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-primary to-purple-600 p-8 text-white">
                    <h2 className="text-3xl font-bold mb-2">Create New Request</h2>
                    <p className="opacity-90">Fill in the details for your delivery request.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Your User ID</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="userId"
                                    required
                                    placeholder="e.g. user123"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    value={formData.userId}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Item Name/ID</label>
                            <div className="relative">
                                <Package className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="itemId"
                                    placeholder="e.g. Cold Coffee"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    value={formData.itemId}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Pickup Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="pickupLocation"
                                    required
                                    placeholder="e.g. Campus Cafe"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    value={formData.pickupLocation}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Drop Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="dropLocation"
                                    required
                                    placeholder="e.g. Block A, Room 101"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    value={formData.dropLocation}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-700">Price Offered (₹)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="number"
                                    name="priceOffered"
                                    required
                                    placeholder="e.g. 50"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    value={formData.priceOffered}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                    >
                        {loading ? 'Posting Request...' : 'Post Request Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateOrder;
