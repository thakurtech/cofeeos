'use client';

import { Coffee } from 'lucide-react';
import { MainNav } from '@/components/MainNav';
import { MenuGrid } from '@/components/pos/MenuGrid';
import { Cart } from '@/components/pos/Cart';
import Link from 'next/link';

export default function POSPage() {
    return (
        <>
            <MainNav />
            <main className="flex h-screen w-full bg-[#f8f5f2] overflow-hidden pt-16">
                {/* Left Side: Menu Grid */}
                <div className="flex-1 h-full overflow-hidden flex flex-col">
                    <header className="h-20 border-b border-[#e8dfd6] flex items-center px-8 justify-between bg-white/80 backdrop-blur-md z-10 shadow-sm">
                        <Link href="/dashboard" className="flex items-center gap-3 group">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#BF5700] to-[#8B4513] flex items-center justify-center shadow-lg shadow-[#BF5700]/20 group-hover:scale-110 transition-transform">
                                <Coffee className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-xl tracking-tight text-[#2B1A12]">CaféOS</h1>
                                <span className="text-xs text-[#BF5700] font-medium">Point of Sale</span>
                            </div>
                        </Link>
                        <div className="flex items-center gap-6 text-sm text-[#5C4033]">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="font-medium">Shift: Morning</span>
                            </div>
                            <span className="h-4 w-px bg-[#e8dfd6]"></span>
                            <span className="font-medium">Server: John Doe</span>
                        </div>
                    </header>
                    <div className="flex-1 overflow-hidden">
                        <MenuGrid />
                    </div>
                </div>

                {/* Right Side: Cart */}
                <div className="w-[420px] h-full shadow-2xl z-20">
                    <Cart />
                </div>
            </main>
        </>
    );
}
