"use client"

import { MainNav } from "@/components/MainNav"
import { StampCard } from "@/components/loyalty/StampCard"
import { TierBadge } from "@/components/loyalty/TierBadge"
import { LeaderboardWidget } from "@/components/loyalty/LeaderboardWidget"
import { Button } from "@/components/ui/button"
import { Share2, Gift, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function LoyaltyPage() {
    return (
        <>
            <MainNav />
            <div className="min-h-screen bg-[#f8f5f2] p-6 pb-24 pt-24">
                <header className="mb-8">
                    <h1 className="text-3xl font-serif font-bold text-[#2B1A12]">My Rewards</h1>
                    <p className="text-[#8B4513]">Earn points, unlock tiers, and enjoy free coffee.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-[#2B1A12] to-[#4A2C2A] rounded-2xl p-6 text-white relative overflow-hidden shadow-xl"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Gift className="w-32 h-32" />
                            </div>
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <div className="text-white/70 text-sm font-medium mb-1">Current Status</div>
                                    <div className="text-3xl font-serif font-bold mb-4">Silver Member</div>
                                    <div className="text-sm text-white/80 mb-2">1,250 Points</div>
                                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                                        <div className="bg-[#D4A017] h-full w-[65%]" />
                                    </div>
                                    <div className="text-xs text-white/60 mt-2">250 points to Gold Tier</div>
                                </div>
                                <TierBadge tier="Silver" />
                            </div>
                        </motion.div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e6dcc8]">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-[#2B1A12]">Coffee Stamp Card</h3>
                                <span className="text-sm text-[#BF5700] font-medium">Buy 9, Get 1 Free</span>
                            </div>
                            <StampCard stamps={7} total={10} />
                            <p className="text-center text-sm text-[#8B4513] mt-4">
                                You're 3 coffees away from a free reward!
                            </p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#BF5700] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">Give ₹50, Get ₹50</h3>
                                <p className="text-white/90 text-sm mb-6">
                                    Share your love for coffee! Invite friends and you both get ₹50 off your next order.
                                </p>
                                <div className="flex gap-2">
                                    <div className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 font-mono text-sm flex-1 text-center">
                                        COFFEE-LVR-22
                                    </div>
                                    <Button variant="secondary" className="bg-white text-[#BF5700] hover:bg-white/90">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e6dcc8]">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-[#2B1A12]">Top Sippers</h3>
                                <Button variant="ghost" size="sm" className="text-[#BF5700]">
                                    View All <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                            <LeaderboardWidget />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
