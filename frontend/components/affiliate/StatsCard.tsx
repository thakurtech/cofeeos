"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    trend?: string
    trendUp?: boolean
    delay?: number
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp, delay = 0 }: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-[#e6dcc8] relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className="w-16 h-16 text-[#BF5700]" />
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#fffcf8] rounded-lg border border-[#e6dcc8]">
                    <Icon className="w-6 h-6 text-[#BF5700]" />
                </div>
                {trend && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {trend}
                    </span>
                )}
            </div>

            <h3 className="text-[#8B4513]/70 text-sm font-medium mb-1">{title}</h3>
            <div className="text-3xl font-bold text-[#2B1A12]">{value}</div>
        </motion.div>
    )
}
