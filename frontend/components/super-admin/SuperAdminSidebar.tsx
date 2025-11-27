"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Store,
    Users,
    DollarSign,
    BarChart3,
    Settings,
    HeadphonesIcon,
    Megaphone,
    Shield
} from "lucide-react"

const navItems = [
    { name: "Dashboard", href: "/super-admin", icon: LayoutDashboard },
    { name: "Cafes", href: "/super-admin/cafes", icon: Store },
    { name: "Affiliates", href: "/super-admin/affiliates", icon: Users },
    { name: "Revenue", href: "/super-admin/revenue", icon: DollarSign },
    { name: "Analytics", href: "/super-admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/super-admin/settings", icon: Settings },
    { name: "Support", href: "/super-admin/support", icon: HeadphonesIcon },
    { name: "Marketing", href: "/super-admin/marketing", icon: Megaphone },
]

export function SuperAdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-gradient-to-b from-[#1a0f0a] to-[#2B1A12] text-white h-screen fixed left-0 top-0 overflow-y-auto border-r border-[#D4A017]/20">
            {/* Logo */}
            <div className="p-6 border-b border-[#D4A017]/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#D4A017] to-[#BF5700] rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg">CaféOS</h1>
                        <p className="text-xs text-[#D4A017]">Super Admin</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                    ? "bg-[#D4A017] text-white shadow-lg"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* User Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#D4A017]/20 bg-[#1a0f0a]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D4A017] rounded-full flex items-center justify-center font-bold">
                        S
                    </div>
                    <div>
                        <div className="font-medium text-sm">Sumit</div>
                        <div className="text-xs text-white/60">Platform Owner</div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
