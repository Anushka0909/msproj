import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Truck, MapPin, CheckCircle, Clock } from 'lucide-react';

const DelivererDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const delivererId = "runner_demo_1";

    useEffect(() => {
        fetchOpenOrders();
    }, []);

    const fetchOpenOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/orders');
            // Show orders relevant to runner: OPEN (to accept) or ASSIGNED to them (to complete)
            const relevant = response.data.filter(o =>
                o.status === 'OPEN' || (o.status === 'ASSIGNED')
            );
            setOrders(relevant);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    const acceptOrder = async (orderId) => {
        if (!confirm("Are you sure you want to accept this order?")) return;

        try {
            await axios.post('http://localhost:8080/deliveries/accept', {
                orderId,
                delivererId
            });
            alert('Order accepted!');
            fetchOpenOrders();
        } catch (error) {
            console.error('Error accepting order:', error);
            alert('Failed to accept order');
        }
    };

    const markDelivered = async (orderId) => {
        if (!confirm("Confirm delivery completion?")) return;
        try {
            // We need the DELIVERY ID to complete it.
            // Option A: Backend adds deliveryId to Order model (ideal but requires refactor).
            // Option B: Query delivery service for delivery by orderId.
            const delRes = await axios.get(`http://localhost:8080/deliveries/order/${orderId}`);
            const delivery = delRes.data[0]; // Assuming list

            if (delivery && delivery.id) {
                await axios.put(`http://localhost:8080/deliveries/${delivery.id}/complete`);
                alert('Order marked as DELIVERED!');
                fetchOpenOrders();
            } else {
                alert('Could not find delivery record to complete.');
            }
        } catch (error) {
            console.error('Error completing delivery:', error);
            alert('Failed to complete delivery');
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Runner Dashboard</h2>
                    <p className="text-slate-500">Find tasks near you and start earning.</p>
                </div>
                <div className="bg-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm font-medium">Logged in as {delivererId}</span>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all p-0 overflow-hidden flex flex-col md:flex-row">
                            <div className="bg-slate-100 p-6 flex flex-col justify-center items-center text-center md:w-32 flex-shrink-0">
                                <div className="text-2xl font-bold text-slate-800">₹{order.priceOffered}</div>
                                <div className="text-xs text-slate-500">Reward</div>
                            </div>

                            <div className="p-6 flex-grow ">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg text-slate-900">{order.itemId || 'Delivery Request'}</h3>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center ${order.status === 'OPEN' ? 'bg-green-100 text-green-700' :
                                            order.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                                        }`}>
                                        <Clock size={12} className="mr-1" /> {order.status}
                                    </span>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center space-x-3 text-sm text-slate-600">
                                        <MapPin size={16} className="text-primary flex-shrink-0" />
                                        <span>Pickup: <span className="font-semibold text-slate-800">{order.pickupLocation}</span></span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-sm text-slate-600">
                                        <MapPin size={16} className="text-secondary flex-shrink-0" />
                                        <span>Drop: <span className="font-semibold text-slate-800">{order.dropLocation}</span></span>
                                    </div>
                                </div>

                                {order.status === 'OPEN' ? (
                                    <button
                                        onClick={() => acceptOrder(order.id)}
                                        className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <span>Accept Order</span>
                                        <Truck size={18} />
                                    </button>
                                ) : order.status === 'ASSIGNED' ? (
                                    <button
                                        onClick={() => markDelivered(order.id)}
                                        className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-green-200"
                                    >
                                        <span>Mark Delivered</span>
                                        <CheckCircle size={18} />
                                    </button>
                                ) : (
                                    <div className="w-full bg-slate-100 text-slate-500 font-semibold py-3 rounded-xl flex items-center justify-center">
                                        <span>Completed</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {orders.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-slate-100 border-dashed">
                            <Truck size={48} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-400">No orders available.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DelivererDashboard;
