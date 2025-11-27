'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Coffee, ArrowRight, Mail, Lock, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('admin@cafeos.com');
    const [password, setPassword] = useState('password');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();

            // Store auth data
            localStorage.setItem('auth_token', data.access_token);
            localStorage.setItem('user_data', JSON.stringify(data.user));

            // Redirect based on role
            switch (data.user.role) {
                case 'SUPER_ADMIN':
                    router.push('/super-admin');
                    break;
                case 'CAFE_OWNER':
                case 'MANAGER':
                    router.push('/dashboard');
                    break;
                case 'CASHIER':
                    router.push('/pos');
                    break;
                case 'CHEF':
                    router.push('/kitchen');
                    break;
                case 'AFFILIATE':
                    router.push('/affiliate');
                    break;
                case 'CUSTOMER':
                    router.push('/loyalty');
                    break;
                default:
                    router.push('/');
            }
        } catch (err: any) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#BF5700]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D4A017]/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md relative z-10 px-4">
                <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-2xl border border-white">
                    <div className="text-center mb-10">
                        <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br from-[#BF5700] to-[#8B4513] items-center justify-center shadow-lg shadow-[#BF5700]/20 mb-6">
                            <Coffee className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#2B1A12] mb-2">Welcome to CaféOS</h1>
                        <p className="text-[#5C4033]">Sign in to your account</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#2B1A12] ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C4033]/50" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#f8f5f2] border-none focus:ring-2 focus:ring-[#BF5700]/20 text-[#2B1A12] font-medium transition-all"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#2B1A12] ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C4033]/50" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#f8f5f2] border-none focus:ring-2 focus:ring-[#BF5700]/20 text-[#2B1A12] font-medium transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 text-lg bg-gradient-to-r from-[#BF5700] to-[#8B4513] hover:from-[#A04000] hover:to-[#703810] text-white rounded-xl shadow-lg shadow-[#BF5700]/20 transition-all hover:scale-[1.02]"
                        >
                            {loading ? (
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
                            Customer?{' '}
                            <Link href="/register" className="font-bold text-[#BF5700] hover:underline">
                                Sign up for rewards
                            </Link>
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-8 pt-6 border-t border-[#e6dcc8]/50">
                        <p className="text-xs font-bold text-[#2B1A12] mb-2">Demo Login:</p>
                        <div className="space-y-1 text-xs text-[#8B4513]">
                            <p><span className="font-semibold">Super Admin:</span> admin@cafeos.com / password</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
