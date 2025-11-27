"use client"

import { StatsCard } from "@/components/affiliate/StatsCard"
import { CommissionChart } from "@/components/affiliate/CommissionChart"
import { DollarSign, Store, TrendingUp, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function AffiliateDashboard() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-[#2B1A12]">Overview</h2>
                    <p className="text-[#8B4513]">Welcome back! Here's how your network is growing.</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-[#8B4513]">Next Payout</div>
                    <div className="text-2xl font-bold text-[#BF5700]">₹4,200</div>
                    <div className="text-xs text-[#8B4513]/70">Due on Dec 1st</div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Earnings"
                    value="₹12,450"
                    icon={DollarSign}
                    trend="+12%"
                    trendUp={true}
                    delay={0.1}
                />
                <StatsCard
                    title="Active Cafes"
                    value="28"
                    icon={Store}
                    trend="+3"
                    trendUp={true}
                    delay={0.2}
                />
                <StatsCard
                    title="Pending Payout"
                    value="₹4,200"
                    icon={TrendingUp}
                    delay={0.3}
                />
                <StatsCard
                    title="Total Referrals"
                    value="35"
                    icon={Users}
                    trend="80% Conversion"
                    trendUp={true}
                    delay={0.4}
                />
            </div>

            {/* Charts & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-[#e6dcc8]"
                >
                    <h3 className="text-lg font-bold text-[#2B1A12] mb-6">Earnings Growth</h3>
                    <CommissionChart />
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-[#e6dcc8]"
                >
                    <h3 className="text-lg font-bold text-[#2B1A12] mb-4">Recent Signups</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Bean & Brew", status: "Active", date: "2 mins ago" },
                            { name: "Urban Grind", status: "Trial", date: "2 hours ago" },
                            { name: "Morning Mist", status: "Active", date: "Yesterday" },
                            { name: "Cafe Noir", status: "Active", date: "2 days ago" },
                        ].map((cafe, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-[#fffcf8] rounded-lg border border-[#e6dcc8]/50">
                                <div>
                                    <div className="font-medium text-[#2B1A12]">{cafe.name}</div>
                                    <div className="text-xs text-[#8B4513]">{cafe.date}</div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${cafe.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {cafe.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm text-[#BF5700] font-medium hover:bg-[#BF5700]/5 rounded-lg transition-colors">
                        View All Activity
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
