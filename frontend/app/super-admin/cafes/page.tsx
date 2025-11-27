"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreVertical, CheckCircle, XCircle, Clock } from "lucide-react"

const mockCafes = [
    { id: "1", name: "Bean & Brew Mumbai", location: "Mumbai, MH", plan: "Pro", status: "active", orders: 1240, staff: 12, mrr: 2000, joined: "Jan 2024" },
    { id: "2", name: "Golden Cup Delhi", location: "Delhi, DL", plan: "Starter", status: "active", orders: 890, staff: 8, mrr: 1000, joined: "Feb 2024" },
    { id: "3", name: "Espresso Express Bangalore", location: "Bangalore, KA", plan: "Enterprise", status: "active", orders: 2150, staff: 25, mrr: 5000, joined: "Dec 2023" },
    { id: "4", name: "Coffee Corner", location: "Pune, MH", plan: "Starter", status: "trial", orders: 45, staff: 4, mrr: 0, joined: "Jun 2024" },
    { id: "5", name: "Cafe Mocha", location: "Hyderabad, TS", plan: "Pro", status: "suspended", orders: 0, staff: 7, mrr: 0, joined: "Mar 2024" },
]

const statusConfig = {
    active: { label: "Active", color: "bg-green-100 text-green-700", icon: CheckCircle },
    trial: { label: "Trial", color: "bg-yellow-100 text-yellow-700", icon: Clock },
    suspended: { label: "Suspended", color: "bg-red-100 text-red-700", icon: XCircle },
}

export default function CafesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")

    const filteredCafes = mockCafes.filter(cafe => {
        const matchesSearch = cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cafe.location.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filterStatus === "all" || cafe.status === filterStatus
        return matchesSearch && matchesFilter
    })

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#2B1A12] mb-2">Cafe Management</h1>
                <p className="text-[#8B4513]">Manage all cafes on the CaféOS platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-4 border-[#e6dcc8]">
                    <div className="text-sm text-[#8B4513] mb-1">Total Cafes</div>
                    <div className="text-2xl font-bold text-[#2B1A12]">127</div>
                </Card>
                <Card className="p-4 border-[#e6dcc8]">
                    <div className="text-sm text-[#8B4513] mb-1">Active</div>
                    <div className="text-2xl font-bold text-green-600">115</div>
                </Card>
                <Card className="p-4 border-[#e6dcc8]">
                    <div className="text-sm text-[#8B4513] mb-1">Trial</div>
                    <div className="text-2xl font-bold text-yellow-600">9</div>
                </Card>
                <Card className="p-4 border-[#e6dcc8]">
                    <div className="text-sm text-[#8B4513] mb-1">Churned</div>
                    <div className="text-2xl font-bold text-red-600">3</div>
                </Card>
            </div>

            {/* Filters */}
            <Card className="p-6 border-[#e6dcc8] mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]" />
                        <Input
                            placeholder="Search cafes by name or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 border-[#e6dcc8]"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={filterStatus === "all" ? "default" : "outline"}
                            onClick={() => setFilterStatus("all")}
                            className={filterStatus === "all" ? "bg-[#BF5700]" : ""}
                        >
                            All
                        </Button>
                        <Button
                            variant={filterStatus === "active" ? "default" : "outline"}
                            onClick={() => setFilterStatus("active")}
                            className={filterStatus === "active" ? "bg-[#BF5700]" : ""}
                        >
                            Active
                        </Button>
                        <Button
                            variant={filterStatus === "trial" ? "default" : "outline"}
                            onClick={() => setFilterStatus("trial")}
                            className={filterStatus === "trial" ? "bg-[#BF5700]" : ""}
                        >
                            Trial
                        </Button>
                        <Button
                            variant={filterStatus === "suspended" ? "default" : "outline"}
                            onClick={() => setFilterStatus("suspended")}
                            className={filterStatus === "suspended" ? "bg-[#BF5700]" : ""}
                        >
                            Suspended
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Cafes Table */}
            <Card className="border-[#e6dcc8]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cafe Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Orders</TableHead>
                            <TableHead>Staff</TableHead>
                            <TableHead>MRR</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCafes.map((cafe) => {
                            const StatusIcon = statusConfig[cafe.status as keyof typeof statusConfig].icon
                            return (
                                <TableRow key={cafe.id}>
                                    <TableCell className="font-medium">{cafe.name}</TableCell>
                                    <TableCell>{cafe.location}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-[#BF5700] text-[#BF5700]">
                                            {cafe.plan}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <StatusIcon className="w-4 h-4" />
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig[cafe.status as keyof typeof statusConfig].color}`}>
                                                {statusConfig[cafe.status as keyof typeof statusConfig].label}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{cafe.orders.toLocaleString()}</TableCell>
                                    <TableCell>{cafe.staff}</TableCell>
                                    <TableCell>₹{cafe.mrr.toLocaleString()}</TableCell>
                                    <TableCell>{cafe.joined}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
