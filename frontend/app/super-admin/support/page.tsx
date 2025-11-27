"use client"

import { Card } from "@/components/ui/card"
import { HeadphonesIcon, AlertCircle, CheckCircle } from "lucide-react"

export default function SupportPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#2B1A12] mb-2">Support & Monitoring</h1>
            <p className="text-[#8B4513] mb-8">System health and customer support</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-[#e6dcc8]">
                    <HeadphonesIcon className="w-8 h-8 text-[#BF5700] mb-4" />
                    <div className="text-sm text-[#8B4513]">Open Tickets</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">7</div>
                </Card>
                <Card className="p-6 border-[#e6dcc8]">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
                    <div className="text-sm text-[#8B4513]">System Status</div>
                    <div className="text-3xl font-bold text-green-600">Healthy</div>
                </Card>
                <Card className="p-6 border-[#e6dcc8]">
                    <AlertCircle className="w-8 h-8 text-yellow-600 mb-4" />
                    <div className="text-sm text-[#8B4513]">Uptime</div>
                    <div className="text-3xl font-bold text-[#2B1A12]">99.9%</div>
                </Card>
            </div>

            <Card className="p-8 border-[#e6dcc8] text-center">
                <h2 className="text-xl font-bold text-[#2B1A12] mb-2">Coming Soon</h2>
                <p className="text-[#8B4513]">Support ticket system and system monitoring features</p>
            </Card>
        </div>
    )
}
