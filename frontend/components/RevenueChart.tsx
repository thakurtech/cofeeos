'use client';

import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', value: 40000 },
    { name: 'Tue', value: 45000 },
    { name: 'Wed', value: 55000 },
    { name: 'Thu', value: 50000 },
    { name: 'Fri', value: 65000 },
    { name: 'Sat', value: 75000 },
    { name: 'Sun', value: 70000 },
];

export default function RevenueChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#BF5700" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#BF5700" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#BF5700" strokeWidth={3} fill="url(#colorValue)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
