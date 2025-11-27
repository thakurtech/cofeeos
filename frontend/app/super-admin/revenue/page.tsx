"use client"

import { Card } from "@/components/ui/card"
import { DollarSign, TrendingUp, CreditCard } from "lucide-react"

export default function RevenuePage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#2B1A12] mb-2">Revenue & Billing</h1>
            <p className="text-[#8B4513] mb-8">Platform financial overview</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-[#e6dcc8]">
                    <DollarSign className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">MRR</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">₹45,000</div>
                </Card>
                <Card className="p-6 border-[#e6dcc8]">
                    <TrendingUp className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">ARR</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">₹5.4L</div>
                </Card>
                <Card className="p-6 border-[#e6dcc8]">
                    <CreditCard className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Active Subscriptions</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">115</div>
                </Card>
            </div>

            <Card className="p-8 border-[#e6dcc8] text-center">
                <h2 className="text-xl font-bold text-[#2B1A12] mb-2">Coming Soon</h2>
                <p className="text-[#8B4513]">Detailed revenue analytics and billing features</p>
            </Card>
        </div>
    )
}
