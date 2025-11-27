"use client"

import { Card } from "@/components/ui/card"
import { Settings, DollarSign, Users } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#2B1A12] mb-2">Platform Settings</h1>
            <p className="text-[#8B4513] mb-8">Configure platform-wide parameters</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-[#e6dcc8]">
                    <Settings className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Feature Flags</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">12</div>
                </Card>
                <Card className="p-6 border-[#e6dcc8]">
                    <DollarSign className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Commission Rate</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">2%</div>
                </Card>
                <Card className="p-6 border-[#e6dcc8]">
                    <Users className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Max Staff/Cafe</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">50</div>
                </Card>
            </div>

            <Card className="p-8 border-[#e6dcc8] text-center">
                <h2 className="text-xl font-bold text-[#2B1A12] mb-2">Coming Soon</h2>
                <p className="text-[#8B4513]">Platform configuration and settings management</p>
            </Card>
        </div>
    )
}
