'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Bell,
    Search,
    TrendingUp,
    DollarSign,
    Coffee,
    Clock,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useAuth } from '@/lib/auth-context';

const DashboardChart = dynamic(() => import('@/components/DashboardChart'), { ssr: false });

export default function Dashboard() {
    const { user, shop, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [stats, setStats] = useState({
        todayRevenue: 0,
        todayOrders: 0,
        totalCustomers: 0,
        avgWaitTime: '0m'
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.shopId) {
            fetchShopData();
        } else {
            setLoading(false);
        }
    }, [user?.shopId]);

    const fetchShopData = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

            // Fetch shop stats
            const statsRes = await fetch(`${API_URL}/shops/${user?.shopId}/stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (statsRes.ok) {
                const statsData = await statsRes.json();
                setStats({
                    todayRevenue: statsData.todayRevenue || 0,
                    todayOrders: statsData.todayOrders || 0,
                    totalCustomers: statsData.totalCustomers || 0,
                    avgWaitTime: '4m' // TODO: Calculate from orders
                });
            }

            // Fetch recent orders
            const ordersRes = await fetch(`${API_URL}/orders?shopId=${user?.shopId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (ordersRes.ok) {
                const ordersData = await ordersRes.json();
                setRecentOrders(ordersData.slice(0, 5));
            }

        } catch (error) {
            console.error('Failed to fetch shop data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
    };

    const shopName = shop?.name || 'Your Cafe';
    const userName = user?.name || 'Cafe Owner';

    return (
        <div className="min-h-screen bg-[#f8f5f2] flex relative">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-72 bg-[#2B1A12] text-white fixed h-full z-40 transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:flex flex-col
            `}>
                <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#BF5700] to-[#8B4513] flex items-center justify-center shadow-lg shadow-[#BF5700]/20">
                            <Coffee className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <span className="text-lg font-bold tracking-tight block">{shopName}</span>
                            <span className="text-xs text-white/60">Powered by CaféOS</span>
                        </div>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="md:hidden text-white/60 hover:text-white"
                    >
                        <ChevronRight className="h-6 w-6 rotate-180" />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {[
                        { id: 'overview', icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
                        { id: 'orders', icon: ShoppingBag, label: 'Orders', href: '/pos' },
                        { id: 'menu', icon: Coffee, label: 'Menu Mgmt', href: '/dashboard/menu' },
                        { id: 'settings', icon: Settings, label: 'Settings', href: '/dashboard/settings' },
                    ].map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id
                                ? 'bg-[#BF5700] text-white shadow-lg shadow-[#BF5700]/20'
                                : 'text-white/60 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <div className="bg-white/5 rounded-2xl p-4 mb-4">
                        <div className="text-sm text-white/60 mb-1">Today's Progress</div>
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-xl font-bold">{stats.todayOrders} orders</span>
                            <span className="text-xs text-[#BF5700]">₹{stats.todayRevenue.toLocaleString()}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-72 p-4 md:p-8 w-full">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 bg-white rounded-xl shadow-sm text-[#2B1A12]"
                        >
                            <LayoutDashboard className="h-6 w-6" />
                        </button>

                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#2B1A12] mb-1">
                                Welcome, {userName}
                            </h1>
                            <p className="text-sm md:text-base text-[#5C4033]">
                                {loading ? 'Loading...' : `Here's what's happening at ${shopName} today.`}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                        <Link href="/pos">
                            <Button className="bg-[#BF5700] hover:bg-[#A04000] text-white">
                                Open POS
                            </Button>
                        </Link>
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2B1A12] to-[#5C4033] flex items-center justify-center text-white font-bold shadow-lg">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
                    {[
                        { label: 'Today\'s Revenue', value: `₹${stats.todayRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-[#BF5700] to-[#D4A017]' },
                        { label: 'Today\'s Orders', value: stats.todayOrders.toString(), icon: ShoppingBag, color: 'from-[#2B1A12] to-[#5C4033]' },
                        { label: 'Total Customers', value: stats.totalCustomers.toString(), icon: Users, color: 'from-[#52805c] to-[#3d5f45]' },
                        { label: 'Avg. Wait Time', value: stats.avgWaitTime, icon: Clock, color: 'from-[#cc7a4a] to-[#a8623a]' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-[#e8dfd6] hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                    <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                </div>
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-[#2B1A12] mb-1">
                                {loading ? '...' : stat.value}
                            </div>
                            <div className="text-sm text-[#5C4033]">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts & Recent Orders */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Chart */}
                    <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#e8dfd6]">
                        <div className="flex justify-between items-center mb-6 md:mb-8">
                            <h3 className="text-lg md:text-xl font-bold text-[#2B1A12]">Revenue Overview</h3>
                        </div>
                        <div className="h-64 md:h-80">
                            {loading ? (
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    Loading chart...
                                </div>
                            ) : stats.todayOrders === 0 ? (
                                <div className="h-full flex items-center justify-center text-gray-500">
                                    <div className="text-center">
                                        <p className="mb-4">No orders yet today</p>
                                        <Link href="/pos" className="text-[#BF5700] underline">
                                            Create your first order →
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <DashboardChart />
                            )}
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#e8dfd6]">
                        <div className="flex justify-between items-center mb-6 md:mb-8">
                            <h3 className="text-lg md:text-xl font-bold text-[#2B1A12]">Recent Orders</h3>
                            <Link href="/pos" className="text-sm font-bold text-[#BF5700] hover:underline">View All</Link>
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            {loading ? (
                                <p className="text-gray-400 text-center py-4">Loading...</p>
                            ) : recentOrders.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No orders yet</p>
                            ) : (
                                recentOrders.map((order: any, i: number) => (
                                    <div key={order.id || i} className="flex items-center justify-between p-3 hover:bg-[#f8f5f2] rounded-xl transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#BF5700]/10 flex items-center justify-center text-[#BF5700] font-bold group-hover:bg-[#BF5700] group-hover:text-white transition-colors text-xs md:text-sm">
                                                #{order.shortId}
                                            </div>
                                            <div>
                                                <div className="font-bold text-[#2B1A12] text-sm md:text-base">
                                                    {order.items?.length || 0} items
                                                </div>
                                                <div className="text-xs text-[#5C4033]">
                                                    {new Date(order.createdAt).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-[#2B1A12] text-sm md:text-base">
                                                ₹{order.totalAmount?.toLocaleString() || 0}
                                            </div>
                                            <div className={`text-xs font-medium ${order.status === 'COMPLETED' ? 'text-green-600' :
                                                order.status === 'PENDING' ? 'text-orange-500' : 'text-blue-500'
                                                }`}>
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <Link href="/pos">
                            <Button className="w-full mt-6 bg-[#2B1A12] hover:bg-[#BF5700] text-white rounded-xl h-12">
                                New Order
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
