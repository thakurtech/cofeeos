import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Coffee, ShoppingBag, Plus, Trash2, LogOut, TrendingUp, Users, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import ParticleBackground from '../components/ParticleBackground';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('orders');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Coffee' });

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, []);

    const loadData = () => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) setProducts(JSON.parse(savedProducts));

        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) setOrders(JSON.parse(savedOrders).reverse());
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProductWithId = {
            _id: Date.now().toString(),
            ...newProduct,
            price: parseFloat(newProduct.price),
            image: '☕' // Default icon
        };
        const updatedProducts = [...products, newProductWithId];
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
        setNewProduct({ name: '', price: '', category: 'Coffee' });
    };

    const handleDeleteProduct = (id) => {
        const updatedProducts = products.filter(p => p._id !== id);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
    };

    const updateOrderStatus = (id, status) => {
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrders = savedOrders.map(order =>
            order._id === id ? { ...order, status } : order
        );
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        setOrders(updatedOrders.reverse());
    };

    const stats = [
        { label: 'Total Revenue', value: `₹${orders.reduce((sum, o) => sum + o.total, 0)}`, icon: DollarSign, color: '#10B981' },
        { label: 'Active Orders', value: orders.filter(o => o.status === 'pending').length, icon: ShoppingBag, color: '#F59E0B' },
        { label: 'Total Customers', value: new Set(orders.map(o => o.customerName)).size, icon: Users, color: '#3B82F6' }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <ParticleBackground />

            {/* Sidebar */}
            <GlassCard className="glass-panel" style={{ width: '280px', margin: '20px', height: 'calc(100vh - 40px)', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
                <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Coffee size={24} color="var(--color-primary)" />
                    </div>
                    <h2 style={{ fontSize: '20px', color: 'white', margin: 0 }}>Admin OS</h2>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    {[
                        { id: 'orders', label: 'Live Orders', icon: ShoppingBag },
                        { id: 'menu', label: 'Menu Manager', icon: LayoutDashboard },
                        { id: 'analytics', label: 'Analytics', icon: TrendingUp }
                    ].map(item => (
                        <motion.button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            whileHover={{ x: 5 }}
                            style={{
                                padding: '16px 20px',
                                textAlign: 'left',
                                background: activeTab === item.id ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                                borderLeft: activeTab === item.id ? '4px solid var(--color-accent)' : '4px solid transparent',
                                color: activeTab === item.id ? 'var(--color-accent)' : 'rgba(255,255,255,0.6)',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            <item.icon size={20} /> {item.label}
                        </motion.button>
                    ))}
                </nav>

                <button onClick={logout} style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.4)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <LogOut size={20} /> Logout
                </button>
            </GlassCard>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', zIndex: 10 }}>
                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    {stats.map((stat, idx) => (
                        <GlassCard key={idx} hoverEffect style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: `${stat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <stat.icon size={24} color={stat.color} />
                            </div>
                            <div>
                                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{stat.label}</div>
                                <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</div>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'orders' ? (
                        <motion.div
                            key="orders"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <h2 style={{ color: 'white', marginBottom: '20px' }}>Live Orders</h2>
                            <div style={{ display: 'grid', gap: '16px' }}>
                                {orders.map(order => (
                                    <GlassCard key={order._id} style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                <h3 style={{ color: 'white', margin: 0 }}>#{order._id.slice(-4)}</h3>
                                                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{new Date(order.createdAt).toLocaleTimeString()}</span>
                                            </div>
                                            <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', marginBottom: '4px' }}>{order.customerName}</div>
                                            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                                                {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>₹{order.total}</div>
                                                <div style={{ color: order.status === 'completed' ? '#10B981' : '#F59E0B', fontSize: '14px', textTransform: 'uppercase' }}>{order.status}</div>
                                            </div>
                                            {order.status !== 'completed' && (
                                                <AnimatedButton onClick={() => updateOrderStatus(order._id, 'completed')}>
                                                    Ready
                                                </AnimatedButton>
                                            )}
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <h2 style={{ color: 'white', marginBottom: '20px' }}>Menu Manager</h2>

                            <GlassCard style={{ padding: '24px', marginBottom: '30px' }}>
                                <h3 style={{ color: 'white', marginBottom: '20px' }}>Add New Item</h3>
                                <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '16px' }}>
                                    <input
                                        type="text"
                                        placeholder="Item Name"
                                        value={newProduct.name}
                                        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                        style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' }}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={newProduct.price}
                                        onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                        style={{ width: '120px', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' }}
                                        required
                                    />
                                    <select
                                        value={newProduct.category}
                                        onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                        style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' }}
                                    >
                                        <option value="Coffee">Coffee</option>
                                        <option value="Tea">Tea</option>
                                        <option value="Snack">Snack</option>
                                    </select>
                                    <AnimatedButton type="submit">
                                        <Plus size={20} /> Add
                                    </AnimatedButton>
                                </form>
                            </GlassCard>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                                {products.map(product => (
                                    <GlassCard key={product._id} hoverEffect style={{ padding: '20px', position: 'relative' }}>
                                        <div style={{ fontSize: '40px', marginBottom: '10px', textAlign: 'center' }}>{product.image || '☕'}</div>
                                        <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '4px' }}>{product.name}</h3>
                                        <div style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>₹{product.price}</div>
                                        <button
                                            onClick={() => handleDeleteProduct(product._id)}
                                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </GlassCard>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminDashboard;
