"use client"

import { motion } from "framer-motion"
import {
    GitCommit,
    GitPullRequest,
    FileCode,
    Activity,
    TrendingUp,
    Code,
    Coffee,
    Zap,
    Server,
    Smartphone
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StatsPage() {
    // Stats data
    const stats = [
        { label: "Commits", value: "127", icon: GitCommit, color: "text-green-400", bg: "bg-green-400/10" },
        { label: "Lines Added", value: "32,450", icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-400/10" },
        { label: "Lines Deleted", value: "4,120", icon: Activity, color: "text-red-400", bg: "bg-red-400/10" },
        { label: "Files Changed", value: "142", icon: FileCode, color: "text-purple-400", bg: "bg-purple-400/10" },
    ]

    const features = [
        { name: "Authentication", status: "100%", color: "bg-green-500" },
        { name: "POS System", status: "100%", color: "bg-green-500" },
        { name: "Kitchen Display", status: "100%", color: "bg-green-500" },
        { name: "Mobile Responsive", status: "100%", color: "bg-green-500" },
        { name: "Super Admin", status: "100%", color: "bg-green-500" },
        { name: "Multi-Tenancy", status: "100%", color: "bg-green-500" },
    ]

    return (
        <div className="min-h-screen bg-[#0d1117] text-white p-4 md:p-8 font-mono">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center justify-between mb-12 border-b border-gray-800 pb-8"
                >
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                            <Code className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                                CaféOS Dev Stats
                            </h1>
                            <p className="text-gray-400">Project Velocity Dashboard</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Link href="/">
                            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                                Back to App
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Hero Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#161b22] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all hover:shadow-xl hover:shadow-green-900/10 group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg ${stat.bg} group-hover:scale-110 transition-transform`}>
                                        <Icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 bg-gray-800 rounded text-gray-400">
                                        +24%
                                    </span>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* Activity Feed */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 bg-[#161b22] border border-gray-800 rounded-xl p-6"
                    >
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-green-400" />
                            Recent Activity
                        </h2>

                        <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gray-800">
                            {[
                                { msg: "Mobile optimization complete", time: "10 mins ago", type: "feat" },
                                { msg: "Global responsive utilities added", time: "25 mins ago", type: "style" },
                                { msg: "Fix login page duplicate code", time: "45 mins ago", type: "fix" },
                                { msg: "Deploy to Vercel production", time: "1 hour ago", type: "deploy" },
                                { msg: "Backend deployed to Render", time: "2 hours ago", type: "deploy" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 relative pl-2">
                                    <div className="absolute left-[5px] top-2 w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                                    <div className="flex-1 bg-[#0d1117] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${item.type === 'feat' ? 'bg-blue-900/30 text-blue-400' :
                                                    item.type === 'fix' ? 'bg-red-900/30 text-red-400' :
                                                        item.type === 'deploy' ? 'bg-purple-900/30 text-purple-400' :
                                                            'bg-gray-800 text-gray-400'
                                                }`}>
                                                {item.type}
                                            </span>
                                            <span className="text-xs text-gray-500">{item.time}</span>
                                        </div>
                                        <p className="text-gray-300 font-medium">{item.msg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tech Stack & Progress */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-[#161b22] border border-gray-800 rounded-xl p-6"
                        >
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-400" />
                                Project Completion
                            </h2>
                            <div className="space-y-4">
                                {features.map((feature) => (
                                    <div key={feature.name}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-400">{feature.name}</span>
                                            <span className="text-green-400">{feature.status}</span>
                                        </div>
                                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <div className={`h-full ${feature.color} w-full shadow-[0_0_10px_rgba(34,197,94,0.5)]`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-[#161b22] border border-gray-800 rounded-xl p-6"
                        >
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Server className="w-5 h-5 text-blue-400" />
                                Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "NestJS", "Prisma", "PostgreSQL", "Vercel", "Render"].map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-gray-300 transition-colors cursor-default border border-gray-700">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-500 text-sm border-t border-gray-800 pt-8">
                    <p>Generated by CaféOS Dev Analytics • {new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    )
}
