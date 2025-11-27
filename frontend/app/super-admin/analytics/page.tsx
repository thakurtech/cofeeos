"use client"

import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Activity } from "lucide-react"

export default function AnalyticsPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#2B1A12] mb-2">Platform Analytics</h1>
            <p className="text-[#8B4513] mb-8">Business intelligence and insights</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-[#e6dcc8]">
                    <BarChart3 className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Platform Orders</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">45.2K</div>
                </Card>
                <Card className="p-6 border-[#e6dcc8]">
                    <TrendingUp className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Growth Rate</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">+24%</div>
                </Card>
                <Card className="p-6 border-[#e6dcc8]">
                    <Activity className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Active Users</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">2,840</div>
                </Card>
            </div>

            <Card className="p-8 border-[#e6dcc8] text-center">
                <h2 className="text-xl font-bold text-[#2B1A12] mb-2">Coming Soon</h2>
                <p className="text-[#8B4513]">Advanced analytics dashboards with charts and reports</p>
            </Card>
        </div>
    )
}
