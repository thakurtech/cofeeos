"use client"

import { MoreHorizontal, ExternalLink, Coffee } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const referrals = [
    {
        id: "REF-001",
        shopName: "Bean & Brew",
        owner: "Rahul Sharma",
        status: "Active",
        joinedAt: "2024-11-20",
        revenue: "₹1,200",
    },
    {
        id: "REF-002",
        shopName: "Urban Grind",
        owner: "Priya Singh",
        status: "Trial",
        joinedAt: "2024-11-25",
        revenue: "₹0",
    },
    {
        id: "REF-003",
        shopName: "Morning Mist",
        owner: "Amit Patel",
        status: "Active",
        joinedAt: "2024-10-15",
        revenue: "₹2,400",
    },
    {
        id: "REF-004",
        shopName: "Cafe Noir",
        owner: "Sneha Gupta",
        status: "Churned",
        joinedAt: "2024-09-01",
        revenue: "₹450",
    },
    {
        id: "REF-005",
        shopName: "The Daily Cup",
        owner: "Vikram Malhotra",
        status: "Active",
        joinedAt: "2024-11-10",
        revenue: "₹1,200",
    },
]

export function ReferralTable() {
    return (
        <div className="rounded-xl border border-[#e6dcc8] bg-white overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-[#fffcf8]">
                    <TableRow>
                        <TableHead className="w-[250px] text-[#8B4513]">Cafe Name</TableHead>
                        <TableHead className="text-[#8B4513]">Status</TableHead>
                        <TableHead className="text-[#8B4513]">Joined Date</TableHead>
                        <TableHead className="text-[#8B4513]">Total Commission</TableHead>
                        <TableHead className="text-right text-[#8B4513]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {referrals.map((referral) => (
                        <TableRow key={referral.id} className="hover:bg-[#fffcf8]/50">
                            <TableCell className="font-medium text-[#2B1A12]">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#BF5700]/10 rounded-lg">
                                        <Coffee className="w-4 h-4 text-[#BF5700]" />
                                    </div>
                                    <div>
                                        <div>{referral.shopName}</div>
                                        <div className="text-xs text-[#8B4513]/70">{referral.owner}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${referral.status === 'Active' ? 'bg-green-100 text-green-800' :
                                        referral.status === 'Trial' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {referral.status}
                                </span>
                            </TableCell>
                            <TableCell className="text-[#8B4513]">{referral.joinedAt}</TableCell>
                            <TableCell className="font-bold text-[#BF5700]">{referral.revenue}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0 text-[#8B4513]">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem className="gap-2">
                                            <ExternalLink className="w-4 h-4" /> View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">Report Issue</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
