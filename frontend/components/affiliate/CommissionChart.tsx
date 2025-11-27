"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    { month: "Jan", commissions: 450 },
    { month: "Feb", commissions: 900 },
    { month: "Mar", commissions: 1500 },
    { month: "Apr", commissions: 2100 },
    { month: "May", commissions: 2850 },
    { month: "Jun", commissions: 4200 },
]

export function CommissionChart() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorCommissions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#BF5700" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#BF5700" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6dcc8" />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#8B4513', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#8B4513', fontSize: 12 }}
                        tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e6dcc8',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        itemStyle={{ color: '#BF5700', fontWeight: 'bold' }}
                        formatter={(value) => [`₹${value}`, 'Earnings']}
                    />
                    <Area
                        type="monotone"
                        dataKey="commissions"
                        stroke="#BF5700"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorCommissions)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
