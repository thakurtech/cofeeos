"use client"

import { motion } from "framer-motion"
import { Crown } from "lucide-react"

interface TierBadgeProps {
    tier: string
}

export function TierBadge({ tier }: TierBadgeProps) {
    const colors = {
        Bronze: "from-orange-700 to-orange-900",
        Silver: "from-gray-300 to-gray-500",
        Gold: "from-yellow-400 to-yellow-600",
    }

    return (
        <motion.div
            whileHover={{ rotateY: 180 }}
            className={`w-20 h-20 rounded-full bg-gradient-to-br ${colors[tier as keyof typeof colors] || colors.Bronze} flex items-center justify-center shadow-lg border-4 border-white/20`}
        >
            <Crown className="w-10 h-10 text-white drop-shadow-md" />
        </motion.div>
    )
}
