'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardChartProps {
    data?: { name: string; value: number }[];
}

export default function DashboardChart({ data }: DashboardChartProps) {
    // Use passed data or show empty state
    const chartData = data && data.length > 0 ? data : [
        { name: 'No Data', value: 0 }
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#BF5700" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#BF5700" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8dfd6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#5C4033' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#5C4033' }} />
                <Tooltip
                    contentStyle={{ backgroundColor: '#2B1A12', border: 'none', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="value" stroke="#BF5700" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
