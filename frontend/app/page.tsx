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
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#fffcf8] px-4 py-2 md:px-6 md:py-3 rounded-full border border-[#e6dcc8] mb-6 md:mb-8"
            >
              <Coffee className="w-4 h-4 md:w-5 md:h-5 text-[#BF5700]" />
              <span className="text-xs md:text-sm font-medium text-[#8B4513]">Complete Café Management System</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B1A12] mb-4 md:mb-6"
            >
              Welcome to <span className="text-[#BF5700]">CaféOS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-[#8B4513] mb-6 md:mb-8 max-w-2xl mx-auto px-4"
            >
              Everything you need to run your café smoothly - from POS to kitchen management,
              customer loyalty to affiliate programs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Link href="/dashboard">
                <Button className="w-full sm:w-auto bg-[#BF5700] hover:bg-[#8B4513] text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
              <Link href="/table/1">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-[#BF5700] text-[#BF5700] hover:bg-[#fffcf8] px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-xl">
                  View Demo
                </Button>
              </Link>
            </motion.div>
          </div>

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

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">{features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link href={feature.href}>
                  <div className="group relative bg-white rounded-2xl p-6 md:p-8 border-2 border-[#e6dcc8] hover:border-[#BF5700] transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-[#2B1A12] mb-2 md:mb-3">
                      {feature.name}
                    </h3>

                    <p className="text-sm md:text-base text-[#8B4513] mb-4">
                      {feature.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm px-3 py-1 bg-[#fffcf8] rounded-full text-[#8B4513] font-medium">
                        {feature.role}
                      </span>
                      <ArrowRight className="w-5 h-5 text-[#BF5700] group-hover:translate-x-1 transition-transform" />
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
