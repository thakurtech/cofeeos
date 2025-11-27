import { Home, Coffee, DollarSign, UserPlus, LogOut } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar"
import Link from "next/link"

const items = [
    {
        title: "Dashboard",
        url: "/affiliate",
        icon: Home,
    },
    {
        title: "My Cafes",
        url: "/affiliate/cafes",
        icon: Coffee,
    },
    {
        title: "Add New Cafe",
        url: "/affiliate/onboard",
        icon: UserPlus,
    },
    {
        title: "Payouts",
        url: "/affiliate/payouts",
        icon: DollarSign,
    },
]

export function AffiliateSidebar() {
    return (
        <Sidebar className="border-r border-[#e6dcc8] bg-[#fffcf8]">
            <SidebarHeader className="h-16 flex items-center justify-center border-b border-[#e6dcc8]">
                <span className="text-2xl font-serif font-bold text-[#BF5700]">CaféOS</span>
                <span className="text-xs text-[#8B4513] uppercase tracking-widest">Partner</span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[#8B4513]/70">Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="hover:bg-[#BF5700]/10 hover:text-[#BF5700] transition-colors">
                                        <Link href={item.url}>
                                            <item.icon className="w-5 h-5" />
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-[#e6dcc8]">
                <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                </button>
            </SidebarFooter>
        </Sidebar>
    )
}
