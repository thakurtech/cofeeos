"use client"

import { motion } from "framer-motion"
import { Coffee, Check } from "lucide-react"

interface StampCardProps {
    stamps: number
    total: number
}

export function StampCard({ stamps, total }: StampCardProps) {
    return (
        <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: total }).map((_, i) => {
                const isStamped = i < stamps
                const isFree = i === total - 1

                return (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`aspect-square rounded-full flex items-center justify-center border-2 relative ${isStamped
                                ? 'bg-[#BF5700] border-[#BF5700]'
                                : 'bg-[#fffcf8] border-[#e6dcc8] border-dashed'
                            }`}
                    >
                        {isStamped ? (
                            <Check className="w-5 h-5 text-white" />
                        ) : isFree ? (
                            <span className="text-xs font-bold text-[#BF5700]">FREE</span>
                        ) : (
                            <Coffee className="w-4 h-4 text-[#e6dcc8]" />
                        )}

                        {/* Stamp Animation Effect */}
                        {isStamped && (
                            <motion.div
                                initial={{ scale: 2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute inset-0 bg-[#BF5700] rounded-full opacity-20"
                            />
                        )}
                    </motion.div>
                )
            })}
        </div>
    )
}
