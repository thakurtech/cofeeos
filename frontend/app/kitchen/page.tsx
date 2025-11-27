"use client"

import { useState } from "react"
import { MainNav } from "@/components/MainNav"
import { OrderTicket } from "@/components/kitchen/OrderTicket"
import { KanbanColumn } from "@/components/kitchen/KanbanColumn"
import { Clock, ChefHat } from "lucide-react"

const initialOrders = [
    {
        id: "ORD-101",
        shortId: "#101",
        status: "PENDING",
        items: [
            { name: "Cappuccino", quantity: 2, modifiers: ["Oat Milk"] },
            { name: "Croissant", quantity: 1 }
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString()
    },
    {
        id: "ORD-102",
        shortId: "#102",
        status: "PREPARING",
        items: [
            { name: "Iced Latte", quantity: 1 },
            { name: "Avocado Toast", quantity: 1 }
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString()
    }
]

export default function KitchenPage() {
    const [orders, setOrders] = useState(initialOrders)
    const [activeTab, setActiveTab] = useState<'PENDING' | 'PREPARING' | 'READY'>('PENDING')

    const moveOrder = (orderId: string, newStatus: string) => {
        setOrders(orders.map(o =>
            o.id === orderId ? { ...o, status: newStatus } : o
        ))
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
                    <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-3 py-1.5 rounded-full">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono">{new Date().toLocaleTimeString()}</span>
                    </div>
                </header>

                {/* Mobile Tabs */}
                <div className="flex md:hidden gap-2 mb-6 overflow-x-auto pb-2">
                    {columns.map(col => (
                        <button
                            key={col.id}
                            onClick={() => setActiveTab(col.id as any)}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                activeTab === col.id 
                                    ? 'bg-[#BF5700] text-white' 
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                        >
                            {col.title} ({orders.filter(o => o.status === col.id).length})
                        </button>
                    ))}
                </div>

                {/* Kanban Board */}
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
            </div>
        </>
    )
}
