import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import ParticleBackground from '../components/ParticleBackground';
import ThemeToggle from '../components/ThemeToggle';
import { Coffee, Lock, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = signup(name, email, password);
        if (result.success) {
            navigate('/shop');
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
                    <h2 style={{ fontSize: '32px', color: 'var(--color-text)', marginBottom: '8px', fontWeight: '800' }}>Create Account</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>Join the CoffeeShopOS community</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--color-text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: '100%', padding: '14px 16px 14px 48px', background: 'var(--color-surface)', border: '2px solid var(--glass-border)', borderRadius: '12px', color: 'var(--color-text)', fontSize: '15px', outline: 'none', transition: 'all 0.3s' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                required
                            />
                        </div>
                    </div>

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
                        Sign Up
                    </AnimatedButton>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '15px', color: 'var(--color-text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: '700', borderBottom: '2px solid transparent', transition: 'border-color 0.3s' }} onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}>Sign In</Link>
                </div>
            </GlassCard>
        </div>
    );
};

export default SignupPage;
