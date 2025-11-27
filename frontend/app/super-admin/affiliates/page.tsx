"use client"

import { Card } from "@/components/ui/card"
import { Users, DollarSign, TrendingUp } from "lucide-react"

export default function AffiliatesPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#2B1A12] mb-2">Affiliate Network</h1>
            <p className="text-[#8B4513] mb-8">Manage all affiliate partners and payouts</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-[#e6dcc8]">
                    <Users className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Total Affiliates</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">42</div>
                </Card>
                <Card className="p-6 border-[#e6dcc8]">
                    <DollarSign className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Pending Payouts</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">₹24,500</div>
                </Card>
                <Card className="p-6 border-[#e6dcc8]">
                    <TrendingUp className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Cafes Referred</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">89</div>
                </Card>
            </div>

            <Card className="p-8 border-[#e6dcc8] text-center">
                <h2 className="text-xl font-bold text-[#2B1A12] mb-2">Coming Soon</h2>
                <p className="text-[#8B4513]">Affiliate management features are being built</p>
            </Card>
        </div>
    )
}
