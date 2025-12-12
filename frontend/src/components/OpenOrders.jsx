import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, MapPin, Badge } from 'lucide-react';

const OpenOrders = ({ myOrders }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchOrders();
    }, [myOrders]);

    const fetchOrders = async () => {
        try {
            let url = 'http://localhost:8080/orders';
            if (myOrders && user) {
                url = `http://localhost:8080/orders/user/${user.userId}`;
            }

            const response = await axios.get(url);
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
            case 'DELIVERED': return 'bg-slate-100 text-slate-700 border-slate-200';
            case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const handleCancelOrder = async (orderId) => {
        if (!confirm('Are you sure you want to cancel this order?')) return;
        try {
            await axios.delete(`http://localhost:8080/orders/${orderId}`, {
                params: { userId: user.userId }
            });
            // Logical update: Mark as CANCELLED instead of removing
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'CANCELLED' } : o));
            alert('Order cancelled successfully.');
        } catch (error) {
            console.error('Error cancelling order:', error);
            alert('Failed to cancel order.');
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-8">{myOrders ? 'My Orders' : 'All Delivery Requests'}</h2>

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

                                {/* Lifecycle Stepper */}
                                <div className="pt-4 mt-2">
                                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                                        <span className={order.status !== 'CANCELLED' ? 'text-primary font-bold' : ''}>Open</span>
                                        <span className={order.status === 'ASSIGNED' || order.status === 'DELIVERED' ? 'text-primary font-bold' : ''}>Assigned</span>
                                        <span className={order.status === 'DELIVERED' ? 'text-primary font-bold' : ''}>Delivered</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                                        {order.status === 'CANCELLED' ? (
                                            <div className="h-full bg-red-500 w-full" />
                                        ) : (
                                            <>
                                                <div className={`h-full bg-green-500 transition-all duration-500 ${order.status === 'OPEN' ? 'w-1/3' : order.status === 'ASSIGNED' ? 'w-2/3' : 'w-full'}`} />
                                            </>
                                        )}
                                    </div>
                                    {order.status === 'CANCELLED' && <p className="text-xs text-red-500 font-bold mt-1 text-center">ORDER CANCELLED</p>}
                                </div>
                            </div>

                            {/* Rating Component if Delivered AND it is My Order */}
                            {myOrders && order.status === 'DELIVERED' && (
                                <div className="mt-6 pt-4 border-t border-slate-50">
                                    <RatingComponent orderId={order.id} runnerId="runner_demo_1" />
                                    {/* Note: In real app, we need the actual runnerId from the delivery service or stored in order. 
                                        For this demo, we mock it or fetch it inside RatingComponent */}
                                </div>
                            )}

                            <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center text-xs text-slate-400">
                                <div className="flex flex-col">
                                    <span>By {order.userId}</span>
                                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                {myOrders && (order.status === 'OPEN' || order.status === 'ASSIGNED') && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering other clicks if any
                                            handleCancelOrder(order.id);
                                        }}
                                        className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {orders.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-pink-border border-dashed">
                            <p className="text-slate-400 flex items-center justify-center gap-2">
                                <span>No orders found</span>
                                <span className="text-primary">🎀</span>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Internal Rating Component
const RatingComponent = ({ orderId, runnerId }) => {
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user already rated
        axios.get(`http://localhost:8080/ratings/order/${orderId}`)
            .then(res => {
                if (res.data) {
                    setSubmitted(true);
                    setRating(res.data.ratingValue);
                }
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }, [orderId]);

    const submitRating = async () => {
        if (rating === 0) return;
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            // We need the ACTUAL runner ID. For now I must use the mocked one if not available on order.
            // Ideally order should have runnerId if we updated it, or we fetch delivery.
            // Simple fix: fetch delivery first to get runnerId.
            const delRes = await axios.get(`http://localhost:8080/deliveries/order/${orderId}`);
            const realRunnerId = delRes.data[0]?.delivererId || runnerId;

            await axios.post('http://localhost:8080/ratings', {
                orderId,
                userId: user.userId,
                runnerId: realRunnerId,
                ratingValue: rating,
                comments: 'Great service!'
            });
            setSubmitted(true);
        } catch (e) {
            alert('Error submitting rating');
        }
    };

    if (loading) return <div className="text-xs text-slate-400">Loading rating...</div>;

    if (submitted) {
        return (
            <div className="bg-green-50 p-3 rounded-lg flex items-center justify-center space-x-2">
                <span className="text-green-600 font-bold">Reflected</span>
                <span className="text-yellow-500 font-bold">{rating} ★</span>
            </div>
        );
    }

    return (
        <div className="bg-yellow-50 p-4 rounded-xl">
            <p className="text-xs font-bold text-yellow-800 mb-2 uppercase tracking-wide">Rate your delivery</p>
            <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-xl transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                            ★
                        </button>
                    ))}
                </div>
                {rating > 0 && (
                    <button
                        onClick={submitRating}
                        className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default OpenOrders;
