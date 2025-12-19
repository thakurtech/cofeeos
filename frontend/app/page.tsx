"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Play,
  TrendingUp,
  Users,
  Clock,
  Zap,
  Shield,
  BarChart3,
  CheckCircle2,
  Star,
  Smartphone,
  Coffee,
  ChefHat,
  Receipt,
  Sparkles,
  Target,
  Layers
} from "lucide-react"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"
import { MainNav } from "@/components/MainNav"
import { Footer } from "@/components/Footer"

// Animated Counter
function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <span ref={ref}>
      {prefix}{inView && <CountUp end={end} duration={2.5} separator="," />}{suffix}
    </span>
  )
}

// Gradient background orbs
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-500" />
    </div>
  )
}

export default function LandingPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "15%"])

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white overflow-hidden" ref={containerRef}>
      <MainNav />

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <GradientOrbs />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

        <motion.div style={{ y: heroY }} className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">

            {/* Live indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-10"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-white/80">
                <AnimatedCounter end={10000} suffix="+" /> cafes powered globally
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
            >
              <span className="text-white">The Operating System</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                for Modern Cafés
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              POS, Kitchen Display, Online Ordering, Loyalty & Analytics —
              <span className="text-white font-medium"> all unified in one beautiful platform.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-semibold text-lg text-white shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 flex items-center gap-3"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="#demo">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Watch Demo
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/50"
            >
              {["No credit card required", "14-day free trial", "Cancel anytime"].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Hero Dashboard Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-16 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent z-10 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-orange-500/10">
                <img
                  src="/hero-dashboard.png"
                  alt="CaféOS Dashboard Preview"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
            >
              <div className="w-1.5 h-3 bg-white/40 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 50, prefix: "₹", suffix: "Cr+", label: "Transactions Processed" },
              { value: 10000, suffix: "+", label: "Happy Cafes" },
              { value: 99.9, suffix: "%", label: "Uptime SLA" },
              { value: 4.9, suffix: "/5", label: "Customer Rating" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-white/50 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
              Everything You Need
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              One Platform,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Infinite Possibilities
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              From your first cup to your 100th location. Scale without limits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Receipt, title: "Smart POS", desc: "Lightning-fast checkout with offline mode and smart upselling" },
              { icon: ChefHat, title: "Kitchen Display", desc: "Real-time order management with priority and timing" },
              { icon: Smartphone, title: "Online Ordering", desc: "QR ordering for tables and pickup with your branding" },
              { icon: Star, title: "Loyalty Program", desc: "Points, rewards, and campaigns that keep customers coming" },
              { icon: BarChart3, title: "Live Analytics", desc: "Real-time dashboards with AI-powered insights" },
              { icon: Layers, title: "Multi-Location", desc: "Manage all cafes from one unified dashboard" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BENEFITS SECTION ========== */}
      <section className="py-32 relative bg-gradient-to-b from-stone-900 to-stone-950">
        <GradientOrbs />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
              Real Results
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                Growth
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, stat: "+43%", title: "Revenue Increase", desc: "AI upselling and smart promotions", color: "from-emerald-500 to-teal-500" },
              { icon: Clock, stat: "20 hrs", title: "Saved Weekly", desc: "Automated operations and reporting", color: "from-blue-500 to-indigo-500" },
              { icon: Users, stat: "4.8★", title: "Customer Rating", desc: "Faster service, happier customers", color: "from-amber-500 to-orange-500" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-10 rounded-3xl bg-white/[0.03] border border-white/5 overflow-hidden group hover:border-white/10 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color} mb-3`}>
                  {item.stat}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIAL ========== */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed mb-10 text-white/90">
              "CaféOS <span className="text-amber-400">transformed our business</span>.
              We went from struggling to opening our 3rd location. The ROI was instant."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl font-bold text-white">
                R
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Rajesh Kumar</div>
                <div className="text-white/50 text-sm">Owner, Brew & Beans - Mumbai</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== PRICING SECTION ========== */}
      <section id="pricing" className="py-32 relative bg-gradient-to-b from-stone-950 to-stone-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
              Simple Pricing
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Start Free,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Scale Smart
              </span>
            </h2>
            <p className="text-xl text-white/60">No hidden fees. Cancel anytime.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Starter", price: "₹3,990", period: "/year", features: ["1 Location", "Basic POS", "Online Ordering", "Email Support"], popular: false },
              { name: "Pro", price: "₹7,990", period: "/year", features: ["3 Locations", "Advanced Analytics", "Loyalty Program", "Priority Support", "Custom Branding"], popular: true },
              { name: "Enterprise", price: "Custom", period: "", features: ["Unlimited Locations", "White Label", "Dedicated Manager", "SLA Guarantee"], popular: false }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-3xl ${plan.popular
                  ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-2xl shadow-orange-500/20'
                  : 'bg-white/[0.03] border border-white/5'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-stone-900 text-amber-400 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-white'}`}>{plan.name}</h3>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-white'}`}>{plan.price}</span>
                  <span className={`${plan.popular ? 'text-white/70' : 'text-white/50'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className={`flex items-center gap-3 ${plan.popular ? 'text-white' : 'text-white/70'}`}>
                      <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-emerald-500'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular
                      ? 'bg-stone-900 text-white hover:bg-stone-800'
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'}`}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-32 relative">
        <GradientOrbs />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Coffee className="w-16 h-16 mx-auto mb-8 text-amber-400" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Transform
              </span>{" "}
              Your Café?
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Join 10,000+ cafes that chose growth. Start your free trial today.
            </p>
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl font-semibold text-xl text-white shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 inline-flex items-center gap-4"
              >
                <Coffee className="w-6 h-6" />
                Start Free Trial
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
            <p className="text-white/40 mt-8 text-sm">
              ✓ No credit card required • ✓ 14-day free trial • ✓ Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
