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

    const moveOrder = (orderId: string, newStatus: string) => {
        setOrders(orders.map(o =>
            o.id === orderId ? { ...o, status: newStatus } : o
        ))
    }

    return (
        <>
            <MainNav />
            <div className="min-h-screen bg-[#1a1a1a] text-white p-4 pt-20">
                <header className="flex justify-between items-center mb-6 px-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#BF5700] rounded-lg">
                            <ChefHat className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Kitchen Display System</h1>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono">{new Date().toLocaleTimeString()}</span>
                    </div>
                </header>

                <div className="grid grid-cols-3 gap-6 h-[calc(100vh-150px)]">
                    <KanbanColumn
                        title="Pending"
                        color="bg-red-500/10 border-red-500/20"
                        titleColor="text-red-400"
                        orders={orders.filter(o => o.status === 'PENDING')}
                        onMove={(id) => moveOrder(id, 'PREPARING')}
                        nextLabel="Start Prep"
                    />
                    <KanbanColumn
                        title="Preparing"
                        color="bg-yellow-500/10 border-yellow-500/20"
                        titleColor="text-yellow-400"
                        orders={orders.filter(o => o.status === 'PREPARING')}
                        onMove={(id) => moveOrder(id, 'READY')}
                        nextLabel="Mark Ready"
                    />
                    <KanbanColumn
                        title="Ready"
                        color="bg-green-500/10 border-green-500/20"
                        titleColor="text-green-400"
                        orders={orders.filter(o => o.status === 'READY')}
                        onMove={(id) => moveOrder(id, 'COMPLETED')}
                        nextLabel="Complete"
                    />
                </div>
            </div>
        </>
    )
}
