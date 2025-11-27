'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Coffee, TrendingUp, Users, Zap, Heart, Star, ArrowRight, Check, Sparkles, BarChart3, Shield, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CountUp from 'react-countup';
import dynamic from 'next/dynamic';

const RevenueChart = dynamic(() => import('@/components/RevenueChart'), { ssr: false });

// 3D Card Component
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 150, damping: 20 });

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const [revenue, setRevenue] = useState(50000);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Mock data for chart
  const data = [
    { name: 'Mon', value: revenue * 0.8 },
    { name: 'Tue', value: revenue * 0.9 },
    { name: 'Wed', value: revenue * 1.1 },
    { name: 'Thu', value: revenue * 1.0 },
    { name: 'Fri', value: revenue * 1.3 },
    { name: 'Sat', value: revenue * 1.5 },
    { name: 'Sun', value: revenue * 1.4 },
  ];

  return (
    <div className="min-h-screen overflow-hidden selection:bg-[#BF5700] selection:text-white">

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-[10%] w-64 h-64 bg-[#BF5700]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-40 right-[5%] w-96 h-96 bg-[#D4A017]/5 rounded-full blur-3xl"
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/20 bg-white/60 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#BF5700] to-[#8B4513] flex items-center justify-center shadow-lg shadow-[#BF5700]/20">
              <Coffee className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#2B1A12] tracking-tight">CaféOS</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'Testimonials'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-[#5C4033] hover:text-[#BF5700] font-medium transition-colors">
                {item}
              </Link>
            ))}
            <Link href="/login" className="text-[#5C4033] hover:text-[#BF5700] font-medium transition-colors">
              Sign In
            </Link>
          </div>

          <Link href="/dashboard">
            <Button className="bg-[#2B1A12] hover:bg-[#BF5700] text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 min-h-screen flex items-center z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 border border-[#BF5700]/20 rounded-full backdrop-blur-sm shadow-sm">
                <Sparkles className="h-4 w-4 text-[#BF5700]" />
                <span className="text-sm font-semibold text-[#8B4513] tracking-wide uppercase">The Future of Coffee Shops</span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-[#2B1A12] leading-[0.9]">
                Brew <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF5700] to-[#D4A017]">Success</span>
                <br />
                Serve <span className="italic font-serif font-normal text-[#5C4033]">Better.</span>
              </h1>

              <p className="text-xl text-[#5C4033]/80 leading-relaxed max-w-xl">
                The all-in-one operating system for modern cafés. POS, Inventory, Loyalty, and AI Analytics—beautifully integrated.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/dashboard">
                  <Button size="lg" className="h-16 px-8 text-lg bg-gradient-to-r from-[#BF5700] to-[#8B4513] hover:from-[#A04000] hover:to-[#703810] text-white rounded-2xl shadow-xl shadow-[#BF5700]/20 transition-all hover:scale-105">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pos">
                  <Button size="lg" variant="outline" className="h-16 px-8 text-lg border-2 border-[#2B1A12]/10 bg-white/50 hover:bg-white text-[#2B1A12] rounded-2xl backdrop-blur-sm transition-all hover:scale-105">
                    View Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-[#2B1A12]/5">
                <div>
                  <div className="text-3xl font-bold text-[#2B1A12]"><CountUp end={500} duration={2} />+</div>
                  <div className="text-sm text-[#5C4033]">Partner Cafés</div>
                </div>
                <div className="w-px h-10 bg-[#2B1A12]/10" />
                <div>
                  <div className="text-3xl font-bold text-[#2B1A12]">4.9</div>
                  <div className="flex text-[#D4A017] gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right 3D Content */}
            <div className="relative h-[600px] w-full flex items-center justify-center">
              {/* Background Blob */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#BF5700]/10 to-[#D4A017]/10 rounded-full blur-[100px]" />

              {/* Floating Cards */}
              <TiltCard className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80">
                <div className="glass-panel p-6 rounded-3xl shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-[#5C4033]">Total Revenue</div>
                      <div className="text-3xl font-bold text-[#2B1A12]">₹<CountUp end={124500} separator="," duration={2.5} /></div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-[#BF5700]/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-[#BF5700]" />
                    </div>
                  </div>
                  <RevenueChart />
                </div>
              </TiltCard>

              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-10 top-20 right-0"
              >
                <div className="glass-panel p-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#2B1A12]">Order #284</div>
                    <div className="text-xs text-green-600">Completed</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [15, -15, 15] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-30 bottom-20 left-0"
              >
                <div className="glass-panel p-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#D4A017]/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-[#D4A017] fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#2B1A12]">New Review</div>
                    <div className="text-xs text-[#5C4033]">5.0 Stars</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <section className="py-32 px-4 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-[3rem] p-12 md:p-16 shadow-2xl border border-white/60 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#BF5700]/5 to-transparent rounded-full blur-3xl -z-10" />

            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#2B1A12] mb-4">Calculate Your Growth</h2>
              <p className="text-lg text-[#5C4033]">See how much extra revenue CaféOS can generate for you.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <label className="text-sm font-bold text-[#5C4033] uppercase tracking-wide mb-2 block">Monthly Revenue</label>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-[#2B1A12]/10 rounded-lg appearance-none cursor-pointer accent-[#BF5700]"
                  />
                  <div className="text-3xl font-bold text-[#2B1A12] mt-2">₹{revenue.toLocaleString()}</div>
                </div>

                <div className="p-6 bg-[#BF5700]/5 rounded-2xl border border-[#BF5700]/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="h-5 w-5 text-[#BF5700]" />
                    <span className="font-bold text-[#BF5700]">Efficiency Boost</span>
                  </div>
                  <p className="text-sm text-[#5C4033]">Save 15+ hours/week on manual tasks.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-panel p-8 rounded-3xl bg-white/50">
                  <div className="text-sm text-[#5C4033] mb-1">Projected Annual Extra Revenue</div>
                  <div className="text-5xl font-black text-[#BF5700]">
                    ₹<CountUp end={revenue * 0.2 * 12} separator="," duration={1} />
                  </div>
                  <div className="text-sm text-[#5C4033] mt-2 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>Based on 20% avg. growth</span>
                  </div>
                </div>
                <Button className="w-full h-14 text-lg bg-[#2B1A12] hover:bg-[#BF5700] text-white rounded-xl shadow-lg">
                  Unlock This Growth
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2B1A12] mb-6">Premium Features</h2>
            <p className="text-xl text-[#5C4033] max-w-2xl mx-auto">Everything you need to run a world-class café, packaged in a beautiful interface.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Smartphone, title: 'QR Ordering', desc: 'Contactless ordering right from the table.' },
              { icon: Heart, title: 'Smart Loyalty', desc: 'Keep customers coming back with points.' },
              { icon: BarChart3, title: 'Deep Analytics', desc: 'Know your best sellers and peak hours.' },
              { icon: Zap, title: 'Fast POS', desc: 'Process orders in seconds, not minutes.' },
              { icon: Users, title: 'Staff Mgmt', desc: 'Track shifts, performance, and payouts.' },
              { icon: Shield, title: 'Secure Cloud', desc: 'Your data is safe and accessible anywhere.' },
            ].map((feature, i) => (
              <TiltCard key={i} className="h-full">
                <div className="h-full glass-panel p-8 rounded-3xl hover:bg-white/80 transition-colors group cursor-default">
                  <div className="h-14 w-14 rounded-2xl bg-[#BF5700]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-[#BF5700]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2B1A12] mb-3">{feature.title}</h3>
                  <p className="text-[#5C4033] leading-relaxed">{feature.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2B1A12] text-white py-20 px-4 mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-[#BF5700] flex items-center justify-center">
                  <Coffee className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold">CaféOS</span>
              </div>
              <p className="text-white/60 max-w-sm text-lg">
                Empowering independent cafés with enterprise-grade technology.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Product</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#" className="hover:text-[#BF5700] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#BF5700] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#BF5700] transition-colors">Hardware</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#" className="hover:text-[#BF5700] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#BF5700] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#BF5700] transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40">
            <div>© 2025 CaféOS Inc. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
