"use client"

import { ReferralTable } from "@/components/affiliate/ReferralTable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function MyCafesPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-[#2B1A12]">My Cafes</h2>
                    <p className="text-[#8B4513]">Manage your network of referred restaurants.</p>
                </div>
                <Link href="/affiliate/onboard">
                    <Button className="bg-[#BF5700] hover:bg-[#8B4513] text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Cafe
                    </Button>
                </Link>
            </div>

            <ReferralTable />
        </div>
    )
}
