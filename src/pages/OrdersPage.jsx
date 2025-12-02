import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Clock, CheckCircle, Coffee, Package, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import ParticleBackground from '../components/ParticleBackground';

const OrdersPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/orders?customerName=${user?.name || 'Guest'}`);
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#FFB020';
            case 'preparing': return '#3B82F6';
            case 'ready': return '#10B981';
            case 'completed': return '#8B5CF6';
            case 'cancelled': return '#EF4444';
            default: return '#9CA3AF';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock size={16} />;
            case 'preparing': return <Coffee size={16} />;
            case 'ready': return <Package size={16} />;
            case 'completed': return <CheckCircle size={16} />;
            case 'cancelled': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '40px' }}>
            <ParticleBackground />

            {/* Header */}
            <header style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 10 }}>
                <button onClick={() => navigate('/shop')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '8px', borderRadius: '50%', color: 'white', cursor: 'pointer', display: 'flex' }}>
                    <ArrowLeft size={20} />
                </button>
                <h1 style={{ fontSize: '24px', margin: 0, color: 'white' }}>My Orders</h1>
            </header>

            <div style={{ padding: '0 20px', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                {loading ? (
                    <div style={{ color: 'white', textAlign: 'center', marginTop: '40px' }}>Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: '40px' }}>No orders found. Time for a coffee? ☕</div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {orders.map(order => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <GlassCard style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <div>
                                            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '4px' }}>Order #{order._id.slice(-6)}</div>
                                            <div style={{ color: 'white', fontSize: '14px' }}>{new Date(order.createdAt).toLocaleString()}</div>
                                        </div>
                                        <div style={{
                                            padding: '6px 12px',
                                            borderRadius: '100px',
                                            background: `${getStatusColor(order.status)}20`,
                                            color: getStatusColor(order.status),
                                            border: `1px solid ${getStatusColor(order.status)}40`,
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}>
                                            {getStatusIcon(order.status)}
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </div>
                                    </div>

                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '12px 0', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {order.items.map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                                                <span>{item.quantity}x {item.name}</span>
                                                <span>₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Total Amount</div>
                                        <div style={{ color: 'var(--color-accent)', fontSize: '18px', fontWeight: 'bold' }}>₹{order.total}</div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
