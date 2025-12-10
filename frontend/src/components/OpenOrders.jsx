import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, MapPin, Badge } from 'lucide-react';

const OpenOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/orders');
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'OPEN': return 'bg-green-100 text-green-700 border-green-200';
            case 'ASSIGNED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'COMPLETED': return 'bg-slate-100 text-slate-700 border-slate-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-8">All Delivery Requests</h2>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 relative overflow-hidden group">
                            <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                                {order.status}
                            </div>

                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-indigo-50 p-3 rounded-xl text-primary">
                                    <Package size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 line-clamp-1">{order.itemId || 'General Request'}</h3>
                                    <p className="text-sm text-slate-500">₹{order.priceOffered} reward</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-start space-x-2">
                                    <div className="mt-1 min-w-[4px] h-[4px] rounded-full bg-slate-300" />
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Pickup</p>
                                        <p className="text-sm text-slate-700 font-medium">{order.pickupLocation}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <div className="mt-1 min-w-[4px] h-[4px] rounded-full bg-primary" />
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Drop</p>
                                        <p className="text-sm text-slate-700 font-medium">{order.dropLocation}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center text-xs text-slate-400">
                                <span>By {order.userId}</span>
                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}

                    {orders.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-slate-100 border-dashed">
                            <p className="text-slate-400">No orders found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OpenOrders;
