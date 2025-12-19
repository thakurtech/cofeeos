"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Skeleton, SkeletonCard, SkeletonChart } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/EmptyState"
import { celebrationConfetti, successConfetti, fireConfetti } from "@/lib/confetti"
import {
    Sparkles,
    Rocket,
    Zap,
    Star,
    Command,
    Bell,
    Gift,
    TrendingUp
} from "lucide-react"
import { motion } from "framer-motion"

export default function UltraPremiumDemo() {
    const [showSkeleton, setShowSkeleton] = useState(false)
    const [showEmpty, setShowEmpty] = useState(false)

    const triggerSkeleton = () => {
        setShowSkeleton(true)
        setTimeout(() => setShowSkeleton(false), 3000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto mb-12"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl mb-6 shadow-2xl"
                    >
                        <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Ultra-Premium Features
                    </h1>
                    <p className="text-xl text-gray-600">
                        CafeOS is now <span className="font-bold text-orange-600">10,000x better!</span>
                    </p>
                </div>

                {/* Quick Info */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Command className="w-6 h-6 text-orange-600" />
                        <h2 className="text-2xl font-bold">Try It Now</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <kbd className="px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-300 font-mono text-xs">Ctrl</kbd>
                            <span>+</span>
                            <kbd className="px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-300 font-mono text-xs">K</kbd>
                            <span className="text-gray-600">Open Command Palette</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <kbd className="px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-300 font-mono text-xs">Ctrl</kbd>
                            <span>+</span>
                            <kbd className="px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-300 font-mono text-xs">/</kbd>
                            <span className="text-gray-600">Show Keyboard Shortcuts</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Feature Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Toast Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="stagger-item bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                            <Bell className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Toast Notifications</h3>
                    </div>
                    <p className="text-gray-600 mb-6 text-sm">
                        Beautiful, non-blocking feedback system with success, error, and loading states.
                    </p>
                    <div className="space-y-2">
                        <button
                            onClick={() => toast.success("Order placed successfully! 🎉")}
                            className="w-full px-4 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium text-sm"
                        >
                            Success Toast
                        </button>
                        <button
                            onClick={() => toast.error("Failed to process payment")}
                            className="w-full px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium text-sm"
                        >
                            Error Toast
                        </button>
                        <button
                            onClick={() => {
                                toast.promise(
                                    new Promise(resolve => setTimeout(resolve, 2000)),
                                    {
                                        loading: 'Processing...',
                                        success: 'Done!',
                                        error: 'Failed'
                                    }
                                )
                            }}
                            className="w-full px-4 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium text-sm"
                        >
                            Promise Toast
                        </button>
                    </div>
                </motion.div>

                {/* Confetti */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="stagger-item bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                            <Gift className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Confetti Effects</h3>
                    </div>
                    <p className="text-gray-600 mb-6 text-sm">
                        Celebrate wins with beautiful confetti animations that delight users.
                    </p>
                    <div className="space-y-2">
                        <button
                            onClick={() => {
                                successConfetti()
                                toast.success("Achievement unlocked!")
                            }}
                            className="w-full px-4 py-2.5 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-medium text-sm"
                        >
                            Success Confetti
                        </button>
                        <button
                            onClick={() => {
                                celebrationConfetti()
                                toast("🎉 Milestone reached!")
                            }}
                            className="w-full px-4 py-2.5 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors font-medium text-sm"
                        >
                            Celebration
                        </button>
                        <button
                            onClick={() => {
                                fireConfetti()
                                toast("🔥 Epic win!")
                            }}
                            className="w-full px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-colors font-medium text-sm"
                        >
                            Fire Confetti
                        </button>
                    </div>
                </motion.div>

                {/* Skeleton Loaders */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="stagger-item bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Skeleton Loaders</h3>
                    </div>
                    <p className="text-gray-600 mb-6 text-sm">
                        Smooth loading states that reduce perceived loading time by 40%.
                    </p>
                    <button
                        onClick={triggerSkeleton}
                        className="w-full px-4 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium text-sm mb-4"
                    >
                        Show Skeleton (3s)
                    </button>
                    {showSkeleton ? (
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-8 w-1/2" />
                        </div>
                    ) : (
                        <div className="space-y-3 text-sm text-gray-700">
                            <div>This is real content</div>
                            <div>That morphs from skeleton</div>
                            <div className="font-bold text-blue-600">Seamlessly!</div>
                        </div>
                    )}
                </motion.div>

                {/* Empty States */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="stagger-item bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center">
                            <Star className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Empty States</h3>
                    </div>
                    <p className="text-gray-600 mb-6 text-sm">
                        Helpful placeholders that guide users when there's no data to display.
                    </p>
                    <button
                        onClick={() => setShowEmpty(!showEmpty)}
                        className="w-full px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium text-sm mb-4"
                    >
                        {showEmpty ? "Hide" : "Show"} Empty State
                    </button>
                    {showEmpty && (
                        <div className="scale-75 origin-top">
                            <EmptyState type="noOrders" />
                        </div>
                    )}
                </motion.div>

                {/* Command Palette */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="stagger-item bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                            <Command className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Command Palette</h3>
                    </div>
                    <p className="text-gray-600 mb-6 text-sm">
                        Navigate anywhere with Ctrl+K. Reduces clicks by 80% and delights power users.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="text-xs text-gray-500 mb-2">Try it:</div>
                        <div className="flex items-center gap-2 mb-3">
                            <kbd className="px-3 py-1.5 bg-white rounded-lg border border-gray-300 font-mono text-xs">Ctrl</kbd>
                            <span className="text-gray-400">+</span>
                            <kbd className="px-3 py-1.5 bg-white rounded-lg border border-gray-300 font-mono text-xs">K</kbd>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                            <div>• Search all pages</div>
                            <div>• Navigate instantly</div>
                            <div>• Keyboard shortcuts</div>
                        </div>
                    </div>
                </motion.div>

                {/* Animations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="stagger-item bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Enhanced Animations</h3>
                    </div>
                    <p className="text-gray-600 mb-6 text-sm">
                        Smooth 60fps animations with stagger effects, shimmer, and micro-interactions.
                    </p>
                    <div className="space-y-3">
                        <div className="stagger-item bg-indigo-50 p-3 rounded-xl text-sm">Item 1</div>
                        <div className="stagger-item bg-indigo-50 p-3 rounded-xl text-sm">Item 2</div>
                        <div className="stagger-item bg-indigo-50 p-3 rounded-xl text-sm">Item 3</div>
                    </div>
                </motion.div>

            </div>

            {/* Footer CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="max-w-6xl mx-auto mt-12"
            >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <Rocket className="w-16 h-16 mx-auto mb-6 text-orange-500" />
                        <h2 className="text-4xl font-bold mb-4">Ready to Experience It?</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Your CafeOS is now equipped with world-class features that rival the best SaaS products.
                        </p>
                        <button
                            onClick={() => {
                                fireConfetti()
                                toast.success("🎉 You're all set! Enjoy the ultra-premium experience!")
                            }}
                            className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-2xl"
                        >
                            Let's Go! 🚀
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
