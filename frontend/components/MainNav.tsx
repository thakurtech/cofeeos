"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Home,
    ShoppingCart,
    ChefHat,
    QrCode,
    Gift,
    Users,
    LayoutDashboard
} from "lucide-react"

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "POS", href: "/pos", icon: ShoppingCart },
    { name: "Kitchen", href: "/kitchen", icon: ChefHat },
    { name: "QR Menu", href: "/table/1", icon: QrCode },
    { name: "Loyalty", href: "/loyalty", icon: Gift },
    { name: "Affiliate", href: "/affiliate", icon: Users },
]

const ownerLinks = [
    { name: "Super Admin", href: "/super-admin", icon: LayoutDashboard, badge: "Owner" },
]

export function MainNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e6dcc8] shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#BF5700] to-[#8B4513] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <span className="font-serif font-bold text-xl text-[#2B1A12]">CaféOS</span>
                    </Link>

                    <div className="flex items-center gap-2 overflow-x-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${isActive
                                            ? "bg-[#BF5700] text-white"
                                            : "text-[#8B4513] hover:bg-[#fffcf8]"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden sm:inline">{item.name}</span>
                                </Link>
                            )
                        })}

                        <div className="h-8 w-px bg-[#e6dcc8] mx-2" />

                        {ownerLinks.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname.startsWith(item.href)

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap border-2 ${isActive
                                            ? "bg-gradient-to-r from-[#D4A017] to-[#BF5700] text-white border-[#D4A017]"
                                            : "text-[#D4A017] border-[#D4A017] hover:bg-[#D4A017]/10"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden sm:inline">{item.name}</span>
                                    <span className="text-xs px-2 py-0.5 bg-white/20 rounded">{item.badge}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </nav>
    )
}
