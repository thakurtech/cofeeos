"use client"

import Link from "next/link"
import { MainNav } from "@/components/MainNav"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  ChefHat,
  QrCode,
  Gift,
  Users,
  LayoutDashboard,
  ArrowRight,
  Coffee,
  TrendingUp,
  Star
} from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    name: "Dashboard",
    description: "Overview of sales, orders, and analytics",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "from-blue-500 to-blue-600",
    role: "Manager"
  },
  {
    name: "Point of Sale",
    description: "Take orders and process payments",
    icon: ShoppingCart,
    href: "/pos",
    color: "from-[#BF5700] to-[#8B4513]",
    role: "Cashier"
  },
  {
    name: "Kitchen Display",
    description: "Real-time order management for chefs",
    icon: ChefHat,
    href: "/kitchen",
    color: "from-orange-500 to-red-500",
    role: "Chef"
  },
  {
    name: "QR Ordering",
    description: "Let customers order from their table",
    icon: QrCode,
    href: "/table/1",
    color: "from-green-500 to-emerald-600",
    role: "Customer"
  },
  {
    name: "Loyalty Program",
    description: "Reward customers with points and perks",
    icon: Gift,
    href: "/loyalty",
    color: "from-purple-500 to-pink-500",
    role: "Customer"
  },
  {
    name: "Affiliate Portal",
    description: "Manage referrals and earn commissions",
    icon: Users,
    href: "/affiliate",
    color: "from-indigo-500 to-purple-600",
    role: "Affiliate"
  },
]

const stats = [
  { label: "Daily Orders", value: "156", icon: Coffee },
  { label: "Revenue Growth", value: "+24%", icon: TrendingUp },
  { label: "Customer Rating", value: "4.8/5", icon: Star },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f2] to-[#fffcf8]">
      <MainNav />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2B1A12] mb-4">
              Welcome to <span className="text-[#BF5700]">CaféOS</span>
            </h1>
            <p className="text-xl text-[#8B4513] max-w-2xl mx-auto">
              Your complete cafe management system. From orders to loyalty programs, everything in one place.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-[#e6dcc8] shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-[#2B1A12] mb-1">{stat.value}</div>
                      <div className="text-sm text-[#8B4513]">{stat.label}</div>
                    </div>
                    <div className="w-12 h-12 bg-[#BF5700]/10 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#BF5700]" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Link href={feature.href}>
                    <div className="bg-white rounded-2xl p-6 border border-[#e6dcc8] shadow-sm hover:shadow-xl transition-all h-full">
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-[#2B1A12] mb-2">{feature.name}</h3>
                      <p className="text-[#8B4513] mb-4">{feature.description}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs px-3 py-1 bg-[#fffcf8] text-[#BF5700] rounded-full border border-[#e6dcc8]">
                          {feature.role}
                        </span>
                        <ArrowRight className="w-5 h-5 text-[#BF5700] group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-serif font-bold text-[#2B1A12] mb-6">Quick Start</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/pos">
                <Button className="bg-[#BF5700] hover:bg-[#8B4513] text-white px-8 py-6 text-lg rounded-xl shadow-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Start Taking Orders
                </Button>
              </Link>
              <Link href="/kitchen">
                <Button variant="outline" className="border-[#BF5700] text-[#BF5700] hover:bg-[#fffcf8] px-8 py-6 text-lg rounded-xl">
                  <ChefHat className="w-5 h-5 mr-2" />
                  View Kitchen Display
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e6dcc8] bg-white/50 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-[#8B4513]">
          <p>CaféOS - Complete Cafe Management System</p>
          <p className="text-sm mt-2">Built with ❤️ for coffee lovers</p>
        </div>
      </footer>
    </div>
  )
}
