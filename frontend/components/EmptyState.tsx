"use client"

import { Coffee, ShoppingBag, TrendingUp } from "lucide-react"

const emptyStates = {
    noOrders: {
        icon: ShoppingBag,
        title: "No orders yet",
        description: "When customers place orders, they'll appear here.",
        action: "Create Test Order",
        illustration: "🛍️",
    },
    noRevenue: {
        icon: TrendingUp,
        title: "No revenue data",
        description: "Start taking orders to see your revenue analytics.",
        action: "View Demo Data",
        illustration: "📊",
    },
    noMenu: {
        icon: Coffee,
        title: "Your menu is empty",
        description: "Add your first menu item to start selling.",
        action: "Add Menu Item",
        illustration: "☕",
    },
}

interface EmptyStateProps {
    type: keyof typeof emptyStates
    onAction?: () => void
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
    const state = emptyStates[type]
    const Icon = state.icon

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-3xl scale-150"></div>
                <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center border border-gray-200 shadow-lg">
                    <span className="text-5xl">{state.illustration}</span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{state.title}</h3>
            <p className="text-gray-500 mb-8 max-w-sm">{state.description}</p>

            {onAction && (
                <button
                    onClick={onAction}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors shadow-lg hover:shadow-xl"
                >
                    <Icon className="w-5 h-5" />
                    {state.action}
                </button>
            )}

            <div className="mt-8 flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                    <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-200 font-mono">⌘</kbd>
                    <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-200 font-mono">K</kbd>
                    <span>Quick actions</span>
                </div>
            </div>
        </div>
    )
}
