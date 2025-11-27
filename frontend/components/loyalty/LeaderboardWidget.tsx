"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const leaders = [
    { rank: 1, name: "Arjun K.", points: 2450, tier: "Gold" },
    { rank: 2, name: "Sarah M.", points: 1890, tier: "Gold" },
    { rank: 3, name: "Rohan D.", points: 1250, tier: "Silver" },
    { rank: 4, name: "Priya S.", points: 980, tier: "Silver" },
    { rank: 5, name: "Vikram R.", points: 850, tier: "Bronze" },
]

export function LeaderboardWidget() {
    return (
        <div className="space-y-4">
            {leaders.map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-3 bg-[#fffcf8] rounded-lg border border-[#e6dcc8]/50 hover:border-[#BF5700]/30 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${user.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                                user.rank === 2 ? 'bg-gray-100 text-gray-700' :
                                    user.rank === 3 ? 'bg-orange-100 text-orange-700' :
                                        'text-[#8B4513]'
                            }`}>
                            {user.rank}
                        </div>
                        <Avatar className="w-8 h-8 border border-[#e6dcc8]">
                            <AvatarFallback className="bg-[#BF5700]/10 text-[#BF5700] text-xs">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-sm font-medium text-[#2B1A12]">{user.name}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-[#BF5700]">{user.points} pts</div>
                        <div className="text-[10px] text-[#8B4513]/60 uppercase">{user.tier}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
