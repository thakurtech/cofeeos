"use client"

import { useState, useEffect } from "react"
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
import Link from "next/link"
import { Search, MoreVertical, CheckCircle, XCircle, Plus } from "lucide-react"

export default function CafesPage() {
    const [cafes, setCafes] = useState<any[]>([])
    const [stats, setStats] = useState({ total: 0, active: 0, trial: 0, suspended: 0 })
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")

    useEffect(() => {
        fetchCafes()
    }, [])

    const fetchCafes = async () => {
        try {
            const token = localStorage.getItem('auth_token')
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

            const response = await fetch(`${API_URL}/shops`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setCafes(data)

                // Calculate stats from real data
                const newStats = {
                    total: data.length,
                    active: data.filter((c: any) => c.isActive).length,
                    trial: 0,
                    suspended: data.filter((c: any) => !c.isActive).length
                }
                setStats(newStats)
            }
        } catch (error) {
            console.error('Failed to fetch cafes:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredCafes = cafes.filter(cafe => {
        const matchesSearch = cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (cafe.address || '').toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filterStatus === "all" ||
            (filterStatus === 'active' && cafe.isActive) ||
            (filterStatus === 'suspended' && !cafe.isActive)
        return matchesSearch && matchesFilter
    })

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-[#2B1A12] mb-2">Cafe Management</h1>
                    <p className="text-[#8B4513]">Manage all cafes on the CaféOS platform</p>
                </div>
                <Link href="/super-admin/cafes/new">
                    <Button className="bg-[#BF5700] hover:bg-[#A04000] text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        New Cafe
                    </Button>
                </Link>
            </div>

            {/* Stats Cards - Now using real data */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-4 border-[#e6dcc8]">
                    <div className="text-sm text-[#8B4513] mb-1">Total Cafes</div>
                    <div className="text-2xl font-bold text-[#2B1A12]">{stats.total}</div>
                </Card>
                <Card className="p-4 border-[#e6dcc8]">
                    <div className="text-sm text-[#8B4513] mb-1">Active</div>
                    <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                </Card>
                <Card className="p-4 border-[#e6dcc8]">
                    <div className="text-sm text-[#8B4513] mb-1">Trial</div>
                    <div className="text-2xl font-bold text-yellow-600">{stats.trial}</div>
                </Card>
                <Card className="p-4 border-[#e6dcc8]">
                    <div className="text-sm text-[#8B4513] mb-1">Suspended</div>
                    <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
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
                            <TableHead>Joined</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                    Loading cafes...
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && filteredCafes.map((cafe: any) => {
                            const isActive = cafe.isActive
                            const statusColor = isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            const StatusIcon = isActive ? CheckCircle : XCircle
                            const statusLabel = isActive ? "Active" : "Suspended"

                            return (
                                <TableRow key={cafe.id}>
                                    <TableCell className="font-medium">{cafe.name}</TableCell>
                                    <TableCell>{cafe.address || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-[#BF5700] text-[#BF5700]">
                                            Standard
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <StatusIcon className="w-4 h-4" />
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
                                                {statusLabel}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{cafe._count?.orders || 0}</TableCell>
                                    <TableCell>{cafe._count?.users || 0}</TableCell>
                                    <TableCell>{new Date(cafe.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        {!loading && filteredCafes.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                    No cafes found. Click "New Cafe" to add one!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
