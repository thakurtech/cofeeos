"use client"

import { Download, CheckCircle, Clock } from "lucide-react"

const payouts = [
    { id: "PAY-1023", date: "Nov 01, 2024", amount: "₹3,800", status: "Paid", method: "Bank Transfer" },
    { id: "PAY-1022", date: "Oct 01, 2024", amount: "₹2,400", status: "Paid", method: "UPI" },
    { id: "PAY-1021", date: "Sep 01, 2024", amount: "₹1,200", status: "Paid", method: "UPI" },
]

export default function PayoutsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-bold text-[#2B1A12]">Payouts</h2>
                <p className="text-[#8B4513]">Track your earnings and download invoices.</p>
            </div>

            <div className="grid gap-4">
                {payouts.map((payout) => (
                    <div key={payout.id} className="bg-white p-6 rounded-xl border border-[#e6dcc8] shadow-sm flex items-center justify-between group hover:border-[#BF5700]/30 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <div className="font-bold text-[#2B1A12] text-lg">{payout.amount}</div>
                                <div className="text-sm text-[#8B4513]">Paid on {payout.date} • via {payout.method}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                {payout.status}
                            </span>
                            <button className="p-2 text-[#8B4513] hover:text-[#BF5700] hover:bg-[#fffcf8] rounded-lg transition-colors">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Pending Payout */}
                <div className="bg-[#fffcf8] p-6 rounded-xl border border-dashed border-[#BF5700]/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <div className="font-bold text-[#2B1A12] text-lg">₹4,200</div>
                            <div className="text-sm text-[#8B4513]">Estimated for Dec 01, 2024</div>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                        Pending
                    </span>
                </div>
            </div>
        </div>
    )
}
