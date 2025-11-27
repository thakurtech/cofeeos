"use client"

import { Card } from "@/components/ui/card"
import { Megaphone, Mail, TrendingUp } from "lucide-react"

export default function MarketingPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#2B1A12] mb-2">Marketing & Communications</h1>
            <p className="text-[#8B4513] mb-8">Platform-wide marketing tools</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-[#e6dcc8]">
                    <Mail className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Email Campaigns</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">0</div>
                </Card>
                <Card className="p-6 border-[#e6dcc8]">
                    <Megaphone className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Announcements</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">3</div>
                </Card>
                <Card className="p-6 border-[#e6dcc8]">
                    <TrendingUp className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Open Rate</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">45%</div>
                </Card>
            </div>

            <Card className="p-8 border-[#e6dcc8] text-center">
                <h2 className="text-xl font-bold text-[#2B1A12] mb-2">Coming Soon</h2>
                <p className="text-[#8B4513]">Marketing campaigns and communication tools</p>
            </Card>
        </div>
    )
}
