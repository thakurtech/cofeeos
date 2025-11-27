'use client';

import { useState } from 'react';
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

const DashboardChart = dynamic(() => import('@/components/DashboardChart'), { ssr: false });

// Mock Data
const revenueData = [
    { name: '9AM', value: 1200 },
    { name: '11AM', value: 3500 },
    { name: '1PM', value: 8200 },
    { name: '3PM', value: 5400 },
    { name: '5PM', value: 9100 },
    { name: '7PM', value: 12400 },
];

const recentOrders = [
    { id: '#2841', items: '2x Cappuccino, 1x Croissant', total: '₹450', status: 'Completed', time: '2 min ago' },
    { id: '#2842', items: '1x Iced Latte, 1x Muffin', total: '₹320', status: 'Pending', time: '5 min ago' },
    { id: '#2843', items: '4x Espresso', total: '₹600', status: 'Processing', time: '8 min ago' },
    { id: '#2844', items: '1x Cold Brew', total: '₹220', status: 'Completed', time: '12 min ago' },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-[#f8f5f2] flex">
            {/* Sidebar */}
            <aside className="w-72 bg-[#2B1A12] text-white fixed h-full z-20 hidden md:flex flex-col">
                <div className="p-8 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#BF5700] to-[#8B4513] flex items-center justify-center shadow-lg shadow-[#BF5700]/20">
                        <Coffee className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">CaféOS</span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                        { id: 'orders', icon: ShoppingBag, label: 'Orders' },
                        { id: 'customers', icon: Users, label: 'Customers' },
                        { id: 'menu', icon: Coffee, label: 'Menu Mgmt' },
                        { id: 'settings', icon: Settings, label: 'Settings' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id
                                ? 'bg-[#BF5700] text-white shadow-lg shadow-[#BF5700]/20'
                                : 'text-white/60 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                            {activeTab === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
                        </button>
                    ))}
                </nav>

                <div className="p-4">
                    <div className="bg-white/5 rounded-2xl p-4 mb-4">
                        <div className="text-sm text-white/60 mb-1">Daily Goal</div>
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-xl font-bold">82%</span>
                            <span className="text-xs text-[#BF5700]">On Track</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[82%] bg-gradient-to-r from-[#BF5700] to-[#D4A017]" />
                        </div>
                    </div>
                    <Link href="/login">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                            <LogOut className="h-5 w-5" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-72 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-[#2B1A12] mb-1">Good Morning, Sumit</h1>
                        <p className="text-[#5C4033]">Here's what's happening in your café today.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C4033]/50" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2.5 rounded-xl border-none bg-white shadow-sm focus:ring-2 focus:ring-[#BF5700]/20 w-64 text-[#2B1A12]"
                            />
                        </div>
                        <button className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#5C4033] hover:text-[#BF5700] transition-colors relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2B1A12] to-[#5C4033] flex items-center justify-center text-white font-bold shadow-lg">
                            S
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Total Revenue', value: '₹12,450', change: '+15%', icon: DollarSign, color: 'from-[#BF5700] to-[#D4A017]' },
                        { label: 'Active Orders', value: '18', change: '+4', icon: ShoppingBag, color: 'from-[#2B1A12] to-[#5C4033]' },
                        { label: 'Total Customers', value: '142', change: '+12%', icon: Users, color: 'from-[#52805c] to-[#3d5f45]' },
                        { label: 'Avg. Wait Time', value: '4m 12s', change: '-30s', icon: Clock, color: 'from-[#cc7a4a] to-[#a8623a]' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-3xl shadow-sm border border-[#e8dfd6] hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                                <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                                    {stat.change}
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-[#2B1A12] mb-1">{stat.value}</div>
                            <div className="text-sm text-[#5C4033]">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts & Recent Orders */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Chart */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-[#e8dfd6]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-[#2B1A12]">Revenue Overview</h3>
                            <select className="bg-[#f8f5f2] border-none rounded-lg px-3 py-1 text-sm font-medium text-[#5C4033]">
                                <option>Today</option>
                                <option>This Week</option>
                                <option>This Month</option>
                            </select>
                        </div>
                        <div className="h-80">
                            <DashboardChart />
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#e8dfd6]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-[#2B1A12]">Recent Orders</h3>
                            <Link href="/pos" className="text-sm font-bold text-[#BF5700] hover:underline">View All</Link>
                        </div>
                        <div className="space-y-6">
                            {recentOrders.map((order, i) => (
                                <div key={i} className="flex items-center justify-between p-3 hover:bg-[#f8f5f2] rounded-xl transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-[#BF5700]/10 flex items-center justify-center text-[#BF5700] font-bold group-hover:bg-[#BF5700] group-hover:text-white transition-colors">
                                            {order.id.slice(1)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#2B1A12]">{order.items}</div>
                                            <div className="text-xs text-[#5C4033]">{order.time}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-[#2B1A12]">{order.total}</div>
                                        <div className={`text-xs font-medium ${order.status === 'Completed' ? 'text-green-600' :
                                            order.status === 'Pending' ? 'text-orange-500' : 'text-blue-500'
                                            }`}>
                                            {order.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
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
