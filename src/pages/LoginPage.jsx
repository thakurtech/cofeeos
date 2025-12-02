import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import ParticleBackground from '../components/ParticleBackground';
import ThemeToggle from '../components/ThemeToggle';
import { Coffee, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(email, password);
        if (result.success) {
            if (result.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/shop');
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'var(--color-bg)', padding: '20px' }}>
            <ParticleBackground />
            <ThemeToggle />

            <GlassCard className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '48px', zIndex: 1, background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-accent), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
                    >
                        <Coffee size={32} color="#fff" />
                    </motion.div>
                    <h2 style={{ fontSize: '32px', color: 'var(--color-text)', marginBottom: '8px', fontWeight: '800' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>Sign in to continue to CoffeeShopOS</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ background: 'rgba(220, 38, 38, 0.2)', border: '1px solid rgba(220, 38, 38, 0.5)', color: '#FCA5A5', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--color-text-muted)' }} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '14px 16px 14px 48px', background: 'var(--color-surface)', border: '2px solid var(--glass-border)', borderRadius: '12px', color: 'var(--color-text)', fontSize: '15px', outline: 'none', transition: 'all 0.3s' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--color-text-muted)' }} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '14px 16px 14px 48px', background: 'var(--color-surface)', border: '2px solid var(--glass-border)', borderRadius: '12px', color: 'var(--color-text)', fontSize: '15px', outline: 'none', transition: 'all 0.3s' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                required
                            />
                        </div>
                    </div>

                    <AnimatedButton type="submit" style={{ width: '100%' }}>
                        Sign In
                    </AnimatedButton>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '15px', color: 'var(--color-text-secondary)' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: '700', borderBottom: '2px solid transparent', transition: 'border-color 0.3s' }} onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}>Sign Up</Link>
                </div>
            </GlassCard>
        </div>
    );
};

export default LoginPage;
