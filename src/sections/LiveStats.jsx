import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import GlassPanel from '../components/GlassPanel';

const CountUp = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!hasAnimated) {
            let start = 0;
            const increment = end / (duration * 60);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                    setHasAnimated(true);
                } else {
                    setCount(Math.floor(start));
                }
            }, 1000 / 60);
            return () => clearInterval(timer);
        }
    }, [end, duration, hasAnimated]);

    return <>{count.toLocaleString()}</>;
};

const StatCard = ({ icon: Icon, value, suffix, label, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
    >
        <GlassPanel hover3D>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${color}60`
                }}>
                    <Icon size={24} color={color} />
                </div>
                <div>
                    <div style={{
                        fontSize: '36px',
                        fontWeight: '800',
                        color,
                        textShadow: `0 0 20px ${color}60`
                    }}>
                        <CountUp end={value} />
                        {suffix}
                    </div>
                    <div style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '4px'
                    }}>
                        {label}
                    </div>
                </div>
            </div>
        </GlassPanel>
    </motion.div>
);

const LiveStats = () => {
    return (
        <SectionWrapper id="stats">
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        textAlign: 'center',
                        marginBottom: '64px'
                    }}
                >
                    <h2 style={{
                        fontSize: '48px',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #00F5FF, white)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '16px'
                    }}>
                        Trusted by the Future
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.6)'
                    }}>
                        Join thousands brewing with AI
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px'
                }}>
                    <StatCard
                        icon={Users}
                        value={10000}
                        suffix="+"
                        label="Happy Coffee Enthusiasts"
                        color="#00F5FF"
                        delay={0}
                    />
                    <StatCard
                        icon={TrendingUp}
                        value={99.9}
                        suffix="%"
                        label="AI Recommendation Accuracy"
                        color="#B026FF"
                        delay={0.2}
                    />
                    <StatCard
                        icon={Zap}
                        value={0}
                        suffix="s"
                        label="Average Wait Time"
                        color="#FFB800"
                        delay={0.4}
                    />
                </div>
            </div>
        </SectionWrapper>
    );
};

export default LiveStats;
