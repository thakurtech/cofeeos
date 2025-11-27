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

    'use client';

    import { useState } from 'react';
    import { useRouter } => 'next/navigation';
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
            <div className="min-h-screen bg-gradient-to-br from-[#fffcf8] via-white to-[#fff8ed] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Logo & Header */}
                    <div className="text-center mb-6 md:mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#BF5700] to-[#8B4513] rounded-2xl mb-4 md:mb-6 shadow-lg">
                            <Coffee className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1A12] mb-2">
                            Welcome to <span className="text-[#BF5700]">CaféOS</span>
                        </h1>
                        <p className="text-sm sm:text-base text-[#8B4513]">Sign in to continue</p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white rounded-2xl shadow-xl border-2 border-[#e6dcc8] p-6 sm:p-8 md:p-10">
                        <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
                            {error && (
                                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-[#2B1A12] mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 md:py-4 border-2 border-[#e6dcc8] rounded-xl focus:border-[#BF5700] focus:ring-2 focus:ring-[#BF5700]/20 outline-none transition-all text-base"
                                        placeholder="admin@cafeos.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-[#2B1A12] mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 md:py-4 border-2 border-[#e6dcc8] rounded-xl focus:border-[#BF5700] focus:ring-2 focus:ring-[#BF5700]/20 outline-none transition-all text-base"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#BF5700] to-[#8B4513] hover:from-[#8B4513] hover:to-[#6B3410] text-white py-3.5 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-[#e6dcc8]" />
                            <span className="text-sm text-[#8B4513]">or</span>
                            <div className="flex-1 h-px bg-[#e6dcc8]" />
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center">
                            <p className="text-sm text-[#8B4513] mb-4">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-[#BF5700] font-semibold hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        {/* Demo Credentials */}
                        <div className="mt-6 p-4 bg-[#fffcf8] border border-[#e6dcc8] rounded-xl">
                            <p className="text-xs sm:text-sm font-semibold text-[#2B1A12] mb-2">Demo Credentials:</p>
                            <div className="space-y-1 text-xs sm:text-sm text-[#8B4513]">
                                <p><span className="font-medium">Super Admin:</span> admin@cafeos.com / password</p>
                                <p><span className="font-medium">Cafe Owner:</span> owner@cafe.com / password</p>
                                <p><span className="font-medium">Cashier:</span> cashier@cafe.com / password</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-6 md:mt-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#8B4513] hover:text-[#BF5700] transition-colors">
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
