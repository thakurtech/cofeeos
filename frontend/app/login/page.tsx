'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, ArrowRight, Lock, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        setTimeout(() => {
            setIsLoading(false);
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-5" />
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#BF5700]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D4A017]/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-2xl border border-white">
                    <div className="text-center mb-10">
                        <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br from-[#BF5700] to-[#8B4513] items-center justify-center shadow-lg shadow-[#BF5700]/20 mb-6">
                            <Coffee className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#2B1A12] mb-2">Welcome Back</h1>
                        <p className="text-[#5C4033]">Sign in to manage your café</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#2B1A12] ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C4033]/50" />
                                <input
                                    type="email"
                                    defaultValue="demo@cafeos.com"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#f8f5f2] border-none focus:ring-2 focus:ring-[#BF5700]/20 text-[#2B1A12] font-medium transition-all"
                                    placeholder="name@cafe.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-[#2B1A12]">Password</label>
                                <a href="#" className="text-xs font-bold text-[#BF5700] hover:underline">Forgot?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C4033]/50" />
                                <input
                                    type="password"
                                    defaultValue="password123"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#f8f5f2] border-none focus:ring-2 focus:ring-[#BF5700]/20 text-[#2B1A12] font-medium transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 text-lg bg-gradient-to-r from-[#BF5700] to-[#8B4513] hover:from-[#A04000] hover:to-[#703810] text-white rounded-xl shadow-lg shadow-[#BF5700]/20 transition-all hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[#5C4033] text-sm">
                            Don't have an account?{' '}
                            <Link href="/" className="font-bold text-[#BF5700] hover:underline">
                                Start Free Trial
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center text-[#5C4033]/60 text-sm">
                    Protected by enterprise-grade security
                </div>
            </motion.div>
        </div>
    );
}
