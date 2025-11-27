"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import {
    TrendingUp,
    Store,
    Users,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Activity
} from "lucide-react"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data - will be replaced with API calls
const mockStats = {
    mrr: 45000,
    mrrGrowth: 12.5,
    totalCafes: 127,
    cafeGrowth: 8,
    activeUsers: 2840,
    userGrowth: 15.2,
    ordersToday: 1456,
    orderGrowth: -3.1
}

const mockMRRData = [
    { month: "Jan", value: 32000 },
    { month: "Feb", value: 35000 },
    { month: "Mar", value: 38000 },
    { month: "Apr", value: 40000 },
    { month: "May", value: 42000 },
    { month: "Jun", value: 45000 },
]

const mockRecentSignups = [
    { name: "Bean & Brew Cafe", location: "Mumbai", date: "2 hours ago", status: "pending" },
    { name: "Golden Cup Coffee", location: "Delhi", date: "5 hours ago", status: "approved" },
    { name: "Espresso Express", location: "Bangalore", date: "1 day ago", status: "approved" },
]

function MetricCard({ title, value, change, icon: Icon, prefix = "" }: any) {
    const isPositive = change >= 0

    return (
        <Card className="p-6 border-[#e6dcc8] bg-white hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm text-[#8B4513] font-medium">{title}</p>
                    <h3 className="text-3xl font-bold text-[#2B1A12] mt-1">
                        {prefix}{value.toLocaleString()}
                    </h3>
                </div>
                <div className="w-12 h-12 bg-[#BF5700]/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#BF5700]" />
                </div>
            </div>
            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span className="font-semibold">{Math.abs(change)}%</span>
                <span className="text-[#8B4513]">vs last month</span>
            </div>
        </Card>
    )
}

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState(mockStats)

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#2B1A12] mb-2">Platform Overview</h1>
                <p className="text-[#8B4513]">Welcome back, Sumit. Here's what's happening with CaféOS today.</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    title="Monthly Recurring Revenue"
                    value={stats.mrr}
                    change={stats.mrrGrowth}
                    icon={DollarSign}
                    prefix="₹"
                />
                <MetricCard
                    title="Total Cafes"
                    value={stats.totalCafes}
                    change={stats.cafeGrowth}
                    icon={Store}
                />
                <MetricCard
                    title="Active Users"
                    value={stats.activeUsers}
                    change={stats.userGrowth}
                    icon={Users}
                />
                <MetricCard
                    title="Orders Today"
                    value={stats.ordersToday}
                    change={stats.orderGrowth}
                    icon={Activity}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* MRR Chart */}
                <Card className="lg:col-span-2 p-6 border-[#e6dcc8]">
                    <h2 className="text-xl font-bold text-[#2B1A12] mb-6">Revenue Growth</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={mockMRRData}>
                            <defs>
                                <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#BF5700" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#BF5700" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e6dcc8" />
                            <XAxis dataKey="month" stroke="#8B4513" />
                            <YAxis stroke="#8B4513" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#2B1A12',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#BF5700"
                                fillOpacity={1}
                                fill="url(#colorMRR)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>

                {/* Recent Signups */}
                <Card className="p-6 border-[#e6dcc8]">
                    <h2 className="text-xl font-bold text-[#2B1A12] mb-6">Recent Signups</h2>
                    <div className="space-y-4">
                        {mockRecentSignups.map((signup, index) => (
                            <div key={index} className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-[#2B1A12] text-sm">{signup.name}</h3>
                                    <p className="text-xs text-[#8B4513]">{signup.location}</p>
                                    <p className="text-xs text-[#8B4513] mt-1">{signup.date}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${signup.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-green-100 text-green-700'
                                    }`}>
                                    {signup.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card className="p-6 border-[#e6dcc8] hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-[#BF5700] to-[#8B4513] text-white">
                    <Store className="w-8 h-8 mb-4" />
                    <h3 className="font-bold text-lg mb-2">Approve Cafes</h3>
                    <p className="text-sm text-white/80">3 pending approvals</p>
                </Card>

                <Card className="p-6 border-[#e6dcc8] hover:shadow-lg transition-shadow cursor-pointer">
                    <Users className="w-8 h-8 mb-4 text-[#BF5700]" />
                    <h3 className="font-bold text-lg mb-2 text-[#2B1A12]">Process Payouts</h3>
                    <p className="text-sm text-[#8B4513]">₹24,500 in pending payouts</p>
                </Card>

                <Card className="p-6 border-[#e6dcc8] hover:shadow-lg transition-shadow cursor-pointer">
                    <TrendingUp className="w-8 h-8 mb-4 text-[#BF5700]" />
                    <h3 className="font-bold text-lg mb-2 text-[#2B1A12]">View Analytics</h3>
                    <p className="text-sm text-[#8B4513]">Detailed platform insights</p>
                </Card>
            </div>
        </div>
    )
}
