"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/MainNav"
import { KanbanColumn } from "@/components/kitchen/KanbanColumn"
import { Clock, ChefHat, RefreshCw } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function KitchenPage() {
    const { user } = useAuth()
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'PENDING' | 'PREPARING' | 'READY'>('PENDING')

    useEffect(() => {
        if (user?.shopId) {
            fetchOrders()
            // Auto-refresh every 30 seconds
            const interval = setInterval(fetchOrders, 30000)
            return () => clearInterval(interval)
        }
    }, [user?.shopId])

    const fetchOrders = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
            const response = await fetch(`${API_URL}/orders/kitchen?shopId=${user?.shopId}`)

            if (response.ok) {
                const data = await response.json()
                // Transform API response to match component requirements
                const formattedOrders = data.map((order: any) => ({
                    id: order.id,
                    shortId: `#${order.shortId}`,
                    status: order.status,
                    items: order.items?.map((item: any) => ({
                        name: item.menuItem?.name || 'Item',
                        quantity: item.quantity,
                        modifiers: []
                    })) || [],
                    createdAt: order.createdAt
                }))
                setOrders(formattedOrders)
            }
        } catch (error) {
            console.error('Failed to fetch kitchen orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const moveOrder = async (orderId: string, newStatus: string) => {
        try {
            const token = localStorage.getItem('auth_token')
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

            await fetch(`${API_URL}/orders/${orderId}/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            })

            // Optimistic update
            setOrders(orders.map(o =>
                o.id === orderId ? { ...o, status: newStatus } : o
            ))
        } catch (error) {
            console.error('Failed to update order status:', error)
        }
    }

    const columns = [
        { id: 'PENDING', title: 'Pending', color: 'bg-red-500/10 border-red-500/20', titleColor: 'text-red-400', next: 'PREPARING', nextLabel: 'Start Prep' },
        { id: 'PREPARING', title: 'Preparing', color: 'bg-yellow-500/10 border-yellow-500/20', titleColor: 'text-yellow-400', next: 'READY', nextLabel: 'Mark Ready' },
        { id: 'READY', title: 'Ready', color: 'bg-green-500/10 border-green-500/20', titleColor: 'text-green-400', next: 'COMPLETED', nextLabel: 'Complete' }
    ]

    return (
        <>
            <MainNav />
            <div className="min-h-screen bg-[#1a1a1a] text-white p-4 pt-20">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#BF5700] rounded-lg">
                            <ChefHat className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Kitchen Display</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchOrders}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-colors"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            <span>Refresh</span>
                        </button>
                        <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-3 py-1.5 rounded-full">
                            <Clock className="w-4 h-4" />
                            <span className="font-mono">{new Date().toLocaleTimeString()}</span>
                        </div>
                    </div>
                </header>

                {/* Mobile Tabs */}
                <div className="flex md:hidden gap-2 mb-6 overflow-x-auto pb-2">
                    {columns.map(col => (
                        <button
                            key={col.id}
                            onClick={() => setActiveTab(col.id as any)}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === col.id
                                    ? 'bg-[#BF5700] text-white'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            {col.title} ({orders.filter(o => o.status === col.id).length})
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center h-64 text-gray-400">
                        Loading orders...
                    </div>
                )}

                {/* Empty State */}
                {!loading && orders.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <ChefHat className="w-12 h-12 mb-4 opacity-50" />
                        <p>No orders yet</p>
                        <p className="text-sm">Orders will appear here when customers place them</p>
                    </div>
                )}

                {/* Kanban Board */}
                {!loading && orders.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-220px)] md:h-[calc(100vh-150px)]">
                        {columns.map(col => (
                            <div key={col.id} className={`${activeTab === col.id ? 'block' : 'hidden'} md:block h-full`}>
                                <KanbanColumn
                                    title={col.title}
                                    color={col.color}
                                    titleColor={col.titleColor}
                                    orders={orders.filter(o => o.status === col.id)}
                                    onMove={(id) => moveOrder(id, col.next)}
                                    nextLabel={col.nextLabel}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
