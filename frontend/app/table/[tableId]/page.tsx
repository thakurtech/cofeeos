"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, ShoppingBag, UtensilsCrossed } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Mock Menu Data
const menuCategories = [
    { id: "coffee", name: "Coffee" },
    { id: "bakery", name: "Bakery" },
    { id: "breakfast", name: "Breakfast" },
]

const menuItems = [
    { id: "1", name: "Cappuccino", price: 180, category: "coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400" },
    { id: "2", name: "Iced Latte", price: 220, category: "coffee", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400" },
    { id: "3", name: "Croissant", price: 150, category: "bakery", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400" },
    { id: "4", name: "Avocado Toast", price: 350, category: "breakfast", image: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?w=400" },
]

export default function TableOrderPage() {
    const params = useParams()
    const tableId = params.tableId
    const [cart, setCart] = useState<{ id: string, qty: number }[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const addToCart = (id: string) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === id)
            if (existing) {
                return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item)
            }
            return [...prev, { id, qty: 1 }]
        })
    }

    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0)
    const totalPrice = cart.reduce((acc, item) => {
        const product = menuItems.find(p => p.id === item.id)
        return acc + (product?.price || 0) * item.qty
    }, 0)

    return (
        <div className="min-h-screen bg-[#f8f5f2] pb-24">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm border-b border-[#e6dcc8]">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="font-serif font-bold text-xl text-[#2B1A12]">Bean & Brew</h1>
                        <p className="text-xs text-[#8B4513]">Table {tableId} • Dine-in</p>
                    </div>
                    <div className="w-10 h-10 bg-[#BF5700]/10 rounded-full flex items-center justify-center">
                        <UtensilsCrossed className="w-5 h-5 text-[#BF5700]" />
                    </div>
                </div>
            </div>

            {/* Menu Categories */}
            <Tabs defaultValue="coffee" className="w-full">
                <div className="sticky top-[73px] z-10 bg-[#f8f5f2] pt-2 pb-2 px-4 overflow-x-auto">
                    <TabsList className="h-10 bg-white border border-[#e6dcc8]">
                        {menuCategories.map(cat => (
                            <TabsTrigger
                                key={cat.id}
                                value={cat.id}
                                className="data-[state=active]:bg-[#BF5700] data-[state=active]:text-white"
                            >
                                {cat.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {menuCategories.map(cat => (
                    <TabsContent key={cat.id} value={cat.id} className="px-4 mt-2 space-y-4">
                        {menuItems.filter(item => item.category === cat.id).map(item => (
                            <div key={item.id} className="bg-white p-3 rounded-xl border border-[#e6dcc8] flex gap-4 shadow-sm">
                                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-[#2B1A12]">{item.name}</h3>
                                        <p className="text-[#BF5700] font-bold">₹{item.price}</p>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="self-end bg-[#fffcf8] border border-[#BF5700] text-[#BF5700] hover:bg-[#BF5700] hover:text-white"
                                        onClick={() => addToCart(item.id)}
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Add
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </TabsContent>
                ))}
            </Tabs>

            {/* Floating Cart Button */}
            <AnimatePresence>
                {totalItems > 0 && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-6 left-4 right-4 z-20"
                    >
                        <Button
                            className="w-full h-14 bg-[#2B1A12] text-white shadow-xl rounded-xl flex justify-between items-center px-6 text-lg"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-[#BF5700] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                    {totalItems}
                                </div>
                                <span>View Order</span>
                            </div>
                            <span className="font-bold">₹{totalPrice}</span>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cart Sheet (Simplified for Demo) */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif font-bold text-[#2B1A12]">Your Order</h2>
                            <Button variant="ghost" onClick={() => setIsCartOpen(false)}>Close</Button>
                        </div>

                        <div className="space-y-4 mb-8">
                            {cart.map(cartItem => {
                                const item = menuItems.find(i => i.id === cartItem.id)
                                return (
                                    <div key={cartItem.id} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-[#BF5700]">{cartItem.qty}x</span>
                                            <span>{item?.name}</span>
                                        </div>
                                        <span>₹{(item?.price || 0) * cartItem.qty}</span>
                                    </div>
                                )
                            })}
                            <div className="border-t border-dashed border-gray-300 pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{totalPrice}</span>
                            </div>
                        </div>

                        <Button className="w-full h-14 bg-[#BF5700] hover:bg-[#8B4513] text-white text-lg rounded-xl font-bold">
                            Place Order <ShoppingBag className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
